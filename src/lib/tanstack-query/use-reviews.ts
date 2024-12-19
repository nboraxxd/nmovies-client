import { useEffect, useState } from 'react'
import omit from 'lodash/omit'
import { InfiniteData, QueryKey, useInfiniteQuery, useMutation, useQueryClient } from '@tanstack/react-query'

import reviewsApi from '@/apis/reviews.api'
import { QUERY_KEY } from '@/constants/tanstack-key'
import { useAuthStore } from '@/lib/stores/auth-store'
import envVariables from '@/lib/schemas/env-variables.schema'
import { CursorPageQueryType } from '@/lib/schemas/common-media.schema'
import {
  GetMyReviewsResponseType,
  GetReviewsByMediaParamsType,
  GetReviewsByMediaResponseType,
} from '@/lib/schemas/reviews.schema'

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

export function useGetMyReviewsQuery(query?: CursorPageQueryType) {
  const [isInitialRender, setIsInitialRender] = useState(true)

  const queryClient = useQueryClient()

  useEffect(() => {
    if (isInitialRender) {
      setIsInitialRender(false)
      return
    }

    return () => {
      queryClient.removeQueries({ queryKey: [QUERY_KEY.GET_MY_REVIEWS] })
    }
  }, [isInitialRender, queryClient])

  return useInfiniteQuery({
    queryFn: ({ pageParam }) => reviewsApi.getMyReviews({ cursor: pageParam }),
    queryKey: [QUERY_KEY.GET_MY_REVIEWS],
    getNextPageParam: (lastPage) => (lastPage.hasNextPage ? lastPage.data.at(-1)?._id : undefined),
    initialPageParam: query?.cursor,
  })
}

export function useDeleteReviewMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ reviewId }: { reviewId: string; queryKey: QueryKey }) => reviewsApi.deleteReview(reviewId),
    onSuccess: (_, { reviewId, queryKey }) => {
      queryClient.setQueryData<InfiniteData<GetReviewsByMediaResponseType | GetMyReviewsResponseType>>(
        queryKey,
        (oldData) => {
          if (!oldData) return oldData

          // Invalidate the query if has only one page, total items less than or equal to limit, and has next page
          if (
            oldData.pages.length === 1 &&
            oldData.pages[0].data.length <= envVariables.VITE_REVIEWS_PER_PAGE_LIMIT &&
            oldData.pages[0].hasNextPage
          ) {
            queryClient.invalidateQueries({
              queryKey,
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
