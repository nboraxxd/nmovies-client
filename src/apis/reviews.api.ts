import http from '@/utils/http'
import { AddReviewBodyType, AddReviewResponseType } from '@/lib/schemas/reviews.schema'

const REVIEWS_PREFIX = '/reviews'

const reviewsApi = {
  addReview: async (body: AddReviewBodyType) => {
    return http.post<AddReviewResponseType>(REVIEWS_PREFIX, body)
  },
}

export default reviewsApi
