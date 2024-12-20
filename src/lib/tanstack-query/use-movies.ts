import { useQuery } from '@tanstack/react-query'

import moviesApi from '@/apis/movies.api'
import { QUERY_KEY } from '@/constants/tanstack-key'
import { PageQueryType } from '@/lib/schemas/common-media.schema'
import { DiscoverMoviesQueryType, MovieIdParamsType } from '@/lib/schemas/movies.schema'

export function useGetDiscoverMoviesQuery(query?: DiscoverMoviesQueryType) {
  return useQuery({
    queryFn: () => moviesApi.discoverMovies(query),
    queryKey: [QUERY_KEY.DISCOVER_MOVIES, query],
  })
}

export function useGetMovieDetailQuery(movieId: number) {
  return useQuery({
    queryFn: () => moviesApi.getMovieDetail(movieId),
    queryKey: [QUERY_KEY.MOVIE_DETAIL, movieId],
  })
}

export function useGetMovieCreditsQuery(movieId: number) {
  return useQuery({
    queryFn: () => moviesApi.getMovieCredits({ movieId }),
    queryKey: [QUERY_KEY.MOVIE_CREDITS, movieId],
  })
}

export function useGetRecommendedMoviesQuery(params: MovieIdParamsType & PageQueryType) {
  return useQuery({
    queryFn: () => moviesApi.getRecommendedMovies(params),
    queryKey: [QUERY_KEY.RECOMMENDED_MOVIES, params],
  })
}

export function useGetGenresMovieQuery() {
  return useQuery({
    queryFn: moviesApi.getGenresMovie,
    queryKey: [QUERY_KEY.GENRES_MOVIE],
  })
}
