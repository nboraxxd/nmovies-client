import http from '@/utils/http'
import {
  AddReviewBodyType,
  AddReviewResponseType,
  GetMyReviewsResponseType,
  GetReviewsByMediaParamsType,
  GetReviewsByMediaResponseType,
} from '@/lib/schemas/reviews.schema'
import { MessageResponseType } from '@/lib/schemas/common.schema'
import { CursorPageQueryType } from '@/lib/schemas/common-media.schema'

const REVIEWS_PREFIX = '/reviews'

const reviewsApi = {
  addReview: async (body: AddReviewBodyType) => {
    return http.post<AddReviewResponseType>(REVIEWS_PREFIX, body)
  },

  getReviewsByMedia: async (params: GetReviewsByMediaParamsType, query?: CursorPageQueryType) => {
    return http.get<GetReviewsByMediaResponseType>(`${REVIEWS_PREFIX}/medias/${params.mediaId}/${params.mediaType}`, {
      params: query,
    })
  },

  getMyReviews: async (query?: CursorPageQueryType) => {
    return http.get<GetMyReviewsResponseType>(`${REVIEWS_PREFIX}/me`, { params: query })
  },

  deleteReview: async (reviewId: string) => {
    return http.delete<MessageResponseType>(`${REVIEWS_PREFIX}/${reviewId}`)
  },
}

export default reviewsApi
