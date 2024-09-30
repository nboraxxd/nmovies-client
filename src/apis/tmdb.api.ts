import http from '@/utils/http'
import {
  DiscoverParamsType,
  DiscoverQueryType,
  DiscoverResponseType,
  TrendingParamsType,
  TrendingQueryType,
  TrendingResponseType,
  TopRatedQueryType,
  TopRatedResponseType,
  TopRatedParamsType,
  MovieDetailResponseType,
  RecommendedMoviesResponseType,
} from '@/lib/schemas/tmdb.schema'

const TMDB_PREFIX = '/tmdb'

const tmdbApi = {
  discover: async (params: DiscoverParamsType, query: DiscoverQueryType) => {
    const { includeAdult, includeVideo, page, sortBy, voteAverageGte, voteAverageLte, withGenres } = query

    return http.get<DiscoverResponseType>(`${TMDB_PREFIX}/discover/${params.mediaType}`, {
      params: { includeAdult, includeVideo, page, sortBy, voteAverageGte, voteAverageLte, withGenres },
    })
  },

  trending: async (params: TrendingParamsType, query?: TrendingQueryType) => {
    const { trendingType, timeWindow } = params

    return http.get<TrendingResponseType>(`${TMDB_PREFIX}/trending/${trendingType}/${timeWindow}`, { params: query })
  },

  topRated: async ({ topRatedType }: TopRatedParamsType, query?: TopRatedQueryType) => {
    return http.get<TopRatedResponseType>(`${TMDB_PREFIX}/top-rated/${topRatedType}`, { params: query })
  },

  getMovieDetail: async (movieId: number) => {
    return http.get<MovieDetailResponseType>(`${TMDB_PREFIX}/movies/${movieId}`)
  },

  getRecommendedMovies: async (movieId: number) => {
    return http.get<RecommendedMoviesResponseType>(`${TMDB_PREFIX}/movies/${movieId}/recommended`)
  },
}

export default tmdbApi
