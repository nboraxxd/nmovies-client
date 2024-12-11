import { useMutation } from '@tanstack/react-query'

import reviewsApi from '@/apis/reviews.api'

export function useAddReviewMutation() {
  return useMutation({
    mutationFn: reviewsApi.addReview,
  })
}
