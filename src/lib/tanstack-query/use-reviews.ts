import omit from 'lodash/omit'
import { InfiniteData, useInfiniteQuery, useMutation, useQueryClient } from '@tanstack/react-query'

import reviewsApi from '@/apis/reviews.api'
import { QUERY_KEY } from '@/constants/tanstack-key'
import { useAuthStore } from '@/lib/stores/auth-store'
import { CursorPageQueryType, MediaType } from '@/lib/schemas/common-media.schema'
import { GetReviewsByMediaParamsType, GetReviewsByMediaResponseType } from '@/lib/schemas/reviews.schema'
import envVariables from '@/lib/schemas/env-variables.schema'

export function useAddReviewMutation() {
  const queryClient = useQueryClient()
  const profile = useAuthStore((state) => state.profile)

  return useMutation({
    mutationFn: reviewsApi.addReview,
    onSuccess: (response) => {
      queryClient.setQueryData<InfiniteData<GetReviewsByMediaResponseType>>(
        [QUERY_KEY.REVIEWS_BY_MEDIA, response.data.mediaType, response.data.mediaId],
        (oldData) => {
          if (!oldData || !profile) return oldData

          const newReview = {
            ...omit(response.data, ['userId']),
            user: omit(profile, ['createdAt', 'updatedAt']),
          }

          return {
            ...oldData,
            pages: oldData.pages.map((reviewPage, index) =>
              index === 0 ? { ...reviewPage, data: [newReview, ...reviewPage.data] } : reviewPage
            ),
          }
        }
      )
    },
  })
}

export function useGetReviewsByMediaQuery({
  mediaId,
  mediaType,
  cursor,
}: GetReviewsByMediaParamsType & CursorPageQueryType) {
  return useInfiniteQuery({
    queryFn: ({ pageParam }) => reviewsApi.getReviewsByMedia({ mediaId, mediaType }, { cursor: pageParam }),
    queryKey: [QUERY_KEY.REVIEWS_BY_MEDIA, mediaType, mediaId],
    getNextPageParam: (lastPage) => (lastPage.hasNextPage ? lastPage.data.at(-1)?._id : undefined),
    initialPageParam: cursor,
  })
}

export function useDeleteReviewMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ reviewId }: { reviewId: string; mediaType: MediaType; mediaId: number }) =>
      reviewsApi.deleteReview(reviewId),
    onSuccess: (_, { mediaType, mediaId, reviewId }) => {
      queryClient.setQueryData<InfiniteData<GetReviewsByMediaResponseType>>(
        [QUERY_KEY.REVIEWS_BY_MEDIA, mediaType, mediaId],
        (oldData) => {
          if (!oldData) return oldData

          // Invalidate the query if has only one page, total items less than or equal to limit, and has next page
          if (
            oldData.pages.length === 1 &&
            oldData.pages[0].data.length <= envVariables.VITE_REVIEWS_PER_PAGE_LIMIT &&
            oldData.pages[0].hasNextPage
          ) {
            queryClient.invalidateQueries({
              queryKey: [QUERY_KEY.REVIEWS_BY_MEDIA, mediaType, mediaId],
            })
          }

          return {
            ...oldData,
            pages: oldData.pages.map((reviewsData) => ({
              ...reviewsData,
              data: reviewsData.data.filter((review) => review._id !== reviewId),
            })),
          }
        }
      )
    },
  })
}
