import http from '@/utils/http'
import {
  DiscoverTvsQueryType,
  DiscoverTvsResponseType,
  RecommendedTvsResponseType,
  TopRatedTvsResponseType,
  TvAggregateCreditsResponseType,
  TvDetailResponseType,
  TvIdParamsType,
} from '@/lib/schemas/tv.schema'
import { PageQueryType } from '@/lib/schemas/common-media.schema'

const TVS_PREFIX = '/tvs'

const tvsApi = {
  discoverTvs: async (query?: DiscoverTvsQueryType) => {
    return http.get<DiscoverTvsResponseType>(`${TVS_PREFIX}/discover`, { params: query })
  },

  topRatedTvs: async (query?: PageQueryType) => {
    return http.get<TopRatedTvsResponseType>(`${TVS_PREFIX}/top-rated`, { params: query })
  },

  getTvDetail: async (tvId: number) => {
    return http.get<TvDetailResponseType>(`${TVS_PREFIX}/${tvId}`)
  },

  getTvAggregateCredits: async (tvId: number) => {
    return http.get<TvAggregateCreditsResponseType>(`${TVS_PREFIX}/${tvId}/aggregate-credits`)
  },

  getRecommendedTvs: async (params: TvIdParamsType & PageQueryType) => {
    const { tvId, page } = params
    return http.get<RecommendedTvsResponseType>(`${TVS_PREFIX}/${tvId}/recommended`, { params: { page } })
  },
}

export default tvsApi
