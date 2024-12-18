import http from '@/utils/http'
import {
  AddReviewBodyType,
  AddReviewResponseType,
  GetReviewsByMediaParamsType,
  GetReviewsByMediaResponseType,
} from '@/lib/schemas/reviews.schema'
import { CursorPageQueryType } from '@/lib/schemas/common-media.schema'
import { MessageResponseType } from '@/lib/schemas/common.schema'

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

  deleteReview: async (reviewId: string) => {
    return http.delete<MessageResponseType>(`${REVIEWS_PREFIX}/${reviewId}`)
  },
}

export default reviewsApi
