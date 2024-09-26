import http from '@/utils/http'
import {
  DiscoverParamsType,
  DiscoverQueryType,
  DiscoverResponseType,
  TrendingParamsType,
  TrendingQueryType,
  TrendingResponseType,
} from '@/lib/schemas/tmdb.schema'

const tmdbApi = {
  discover: async (params: DiscoverParamsType, query: DiscoverQueryType) => {
    const { includeAdult, includeVideo, page, sortBy, voteAverageGte, voteAverageLte, withGenres } = query

    return http.get<DiscoverResponseType>(`/tmdb/discover/${params.mediaType}`, {
      params: { includeAdult, includeVideo, page, sortBy, voteAverageGte, voteAverageLte, withGenres },
    })
  },

  trending: async (params: TrendingParamsType, query: TrendingQueryType) => {
    const { trendingType, timeWindow } = params

    return http.get<TrendingResponseType>(`/tmdb/trending/${trendingType}/${timeWindow}`, { params: query })
  },
}

export default tmdbApi
