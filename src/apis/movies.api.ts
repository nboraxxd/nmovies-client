import http from '@/utils/http'
import {
  DiscoverMoviesQueryType,
  DiscoverMoviesResponseType,
  MovieDetailResponseType,
  MovieIdParamsType,
  RecommendedMoviesResponseType,
  TopRatedMoviesResponseType,
} from '@/lib/schemas/movies.schema'
import { PageQueryType } from '@/lib/schemas/common-media.schema'

const MOVIES_PREFIX = '/movies'

const moviesApi = {
  discoverMovies: async (query?: DiscoverMoviesQueryType) => {
    return http.get<DiscoverMoviesResponseType>(`${MOVIES_PREFIX}/discover`, { params: query })
  },

  topRatedMovies: async (query?: PageQueryType) => {
    return http.get<TopRatedMoviesResponseType>(`${MOVIES_PREFIX}/top-rated`, { params: query })
  },

  getMovieDetail: async (movieId: number) => {
    return http.get<MovieDetailResponseType>(`${MOVIES_PREFIX}/${movieId}`)
  },

  getRecommendedMovies: async (params: MovieIdParamsType & PageQueryType) => {
    const { movieId, page } = params
    return http.get<RecommendedMoviesResponseType>(`${MOVIES_PREFIX}/${movieId}/recommended`, { params: { page } })
  },
}

export default moviesApi
