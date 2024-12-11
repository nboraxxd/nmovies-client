import http from '@/utils/http'
import {
  AddReviewBodyType,
  AddReviewResponseType,
  GetReviewsByMediaParamsType,
  GetReviewsByMediaResponseType,
} from '@/lib/schemas/reviews.schema'
import { PageQueryType } from '@/lib/schemas/common-media.schema'

const REVIEWS_PREFIX = '/reviews'

const reviewsApi = {
  addReview: async (body: AddReviewBodyType) => {
    return http.post<AddReviewResponseType>(REVIEWS_PREFIX, body)
  },

  getReviewsByMedia: async (params: GetReviewsByMediaParamsType, query?: PageQueryType) => {
    return http.get<GetReviewsByMediaResponseType>(`${REVIEWS_PREFIX}/medias/${params.mediaId}/${params.mediaType}`, {
      params: query,
    })
  },
}

export default reviewsApi
