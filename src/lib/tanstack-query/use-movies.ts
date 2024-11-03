import { useQuery } from '@tanstack/react-query'

import moviesApi from '@/apis/movies.api'
import { PageQueryType } from '@/lib/schemas/common-media.schema'
import { DiscoverMoviesQueryType, MovieIdParamsType } from '@/lib/schemas/movies.schema'
import { QUERY_KEY } from '@/constants/tanstack-key'

export function useGetDiscoverMoviesQuery(query?: DiscoverMoviesQueryType) {
  return useQuery({
    queryFn: () => moviesApi.discoverMovies(query),
    queryKey: ['discoverMovies', query],
  })
}

export function useGetMovieDetailQuery(movieId: number) {
  return useQuery({
    queryFn: () => moviesApi.getMovieDetail(movieId),
    queryKey: [QUERY_KEY.MOVIE_DETAIL, movieId],
  })
}

export function useGetRecommendedMoviesQuery(params: MovieIdParamsType & PageQueryType) {
  return useQuery({
    queryFn: () => moviesApi.getRecommendedMovies(params),
    queryKey: ['recommendedMovies', params],
  })
}
