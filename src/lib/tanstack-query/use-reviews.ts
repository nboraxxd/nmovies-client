import { useInfiniteQuery, useMutation, useQueryClient } from '@tanstack/react-query'

import reviewsApi from '@/apis/reviews.api'
import { QUERY_KEY } from '@/constants/tanstack-key'
import { GetReviewsByMediaParamsType } from '@/lib/schemas/reviews.schema'
import { PageQueryType } from '@/lib/schemas/common-media.schema'

export function useAddReviewMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: reviewsApi.addReview,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.REVIEWS_BY_MEDIA] })
    },
  })
}

export function useGetReviewsByMediaQuery({ mediaId, mediaType, page }: GetReviewsByMediaParamsType & PageQueryType) {
  return useInfiniteQuery({
    queryFn: ({ pageParam }) => reviewsApi.getReviewsByMedia({ mediaId, mediaType }, { page: pageParam }),
    queryKey: [QUERY_KEY.REVIEWS_BY_MEDIA, mediaType, mediaId, page],
    getNextPageParam: (lastPage) =>
      lastPage.pagination.currentPage < lastPage.pagination.totalPages
        ? lastPage.pagination.currentPage + 1
        : undefined,
    initialPageParam: page,
  })
}
