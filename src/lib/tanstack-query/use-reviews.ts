import { InfiniteData, useInfiniteQuery, useMutation, useQueryClient } from '@tanstack/react-query'

import reviewsApi from '@/apis/reviews.api'
import { QUERY_KEY } from '@/constants/tanstack-key'
import { GetReviewsByMediaParamsType, GetReviewsByMediaResponseType } from '@/lib/schemas/reviews.schema'
import { PageQueryType } from '@/lib/schemas/common-media.schema'
import { useReviewStore } from '@/lib/stores/review-store'
import { useAuthStore } from '@/lib/stores/auth-store'

export function useAddReviewMutation() {
  const queryClient = useQueryClient()
  const profile = useAuthStore((state) => state.profile)

  return useMutation({
    mutationFn: reviewsApi.addReview,
    onSuccess: (response) => {
      queryClient.setQueryData<InfiniteData<GetReviewsByMediaResponseType, number>>(
        [QUERY_KEY.REVIEWS_BY_MEDIA, 'movie', 845781],
        (oldData) => {
          if (!oldData || !profile) return

          return {
            ...oldData,
            pages: oldData.pages.map((page, index) => {
              if (
                index === page.pagination.currentPage - 1 &&
                page.pagination.currentPage !== page.pagination.totalPages
              ) {
                page.data.pop()
              }

              if (index === 0) {
                return {
                  ...page,
                  data: [
                    {
                      _id: response.data._id,
                      content: response.data.content,
                      updatedAt: response.data.updatedAt,
                      user: {
                        _id: profile._id,
                        email: profile.email,
                        avatar: profile.avatar,
                        isVerified: profile.isVerified,
                        name: profile.name,
                      },
                      createdAt: response.data.createdAt,
                      mediaId: response.data.mediaId,
                      mediaPoster: response.data.mediaPoster,
                      mediaReleaseDate: response.data.mediaReleaseDate,
                      mediaTitle: response.data.mediaTitle,
                      mediaType: response.data.mediaType,
                    },
                    ...page.data,
                  ],
                }
              }

              return page
            }),
          }
        }
      )
    },
  })
}

export function useGetReviewsByMediaQuery({ mediaId, mediaType }: GetReviewsByMediaParamsType) {
  return useInfiniteQuery({
    queryFn: ({ pageParam }) => reviewsApi.getReviewsByMedia({ mediaId, mediaType }, { page: pageParam }),
    queryKey: [QUERY_KEY.REVIEWS_BY_MEDIA, mediaType, mediaId],
    getNextPageParam: (lastPage) =>
      lastPage.pagination.currentPage < lastPage.pagination.totalPages
        ? lastPage.pagination.currentPage + 1
        : undefined,
    initialPageParam: 1,
    // staleTime: 1000 * 60 * 5 /* 5 minutes */,
  })
}

export function useDeleteReviewMutation() {
  return useMutation({
    mutationFn: reviewsApi.deleteReview,
  })
}
