import { useQuery, keepPreviousData } from '@tanstack/react-query'

import tmdbApi from '@/apis/tmdb.api'
import {
  DiscoverParamsType,
  DiscoverQueryType,
  TopRatedParamsType,
  TrendingParamsType,
  TrendingQueryType,
} from '@/lib/schemas/tmdb.schema'

export function useGetDiscoverQuery(params: DiscoverParamsType, query: DiscoverQueryType) {
  return useQuery({
    queryFn: () => tmdbApi.discover(params, query),
    queryKey: ['discover', params, query],
  })
}

export function useGetTrendingQuery(params: TrendingParamsType, query?: TrendingQueryType) {
  return useQuery({
    queryFn: () => tmdbApi.trending(params, query),
    queryKey: ['trending', params, query],
    placeholderData: keepPreviousData,
  })
}

export function useGetTopRatedQuery(params: TopRatedParamsType, query?: TrendingQueryType) {
  return useQuery({
    queryFn: () => tmdbApi.topRated(params, query),
    queryKey: ['topRated', params, query],
    placeholderData: keepPreviousData,
  })
}
