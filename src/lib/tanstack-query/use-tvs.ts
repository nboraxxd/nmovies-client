import { useQuery } from '@tanstack/react-query'

import tvsApi from '@/apis/tvs.api'
import { PageQueryType } from '@/lib/schemas/common-media.schema'
import { DiscoverTvsQueryType, TvIdParamsType } from '@/lib/schemas/tv.schema'
import { QUERY_KEY } from '@/constants/tanstack-key'

export function useGetDiscoverTvsQuery(query?: DiscoverTvsQueryType) {
  return useQuery({
    queryFn: () => tvsApi.discoverTvs(query),
    queryKey: [QUERY_KEY.DISCOVER_TVS, query],
  })
}

export function useGetTvDetailQuery(tvId: number) {
  return useQuery({
    queryFn: () => tvsApi.getTvDetail(tvId),
    queryKey: [QUERY_KEY.TV_DETAIL, tvId],
  })
}

export function useGetTvAggregateCreditsQuery(tvId: number) {
  return useQuery({
    queryFn: () => tvsApi.getTvAggregateCredits(tvId),
    queryKey: [QUERY_KEY.TV_AGGREGATE_CREDITS, tvId],
  })
}

export function useGetRecommendedTvsQuery(params: TvIdParamsType & PageQueryType) {
  return useQuery({
    queryFn: () => tvsApi.getRecommendedTvs(params),
    queryKey: [QUERY_KEY.RECOMMENDED_TVS, params],
  })
}

export function useGetGenresTvQuery() {
  return useQuery({
    queryFn: tvsApi.getGenresTv,
    queryKey: [QUERY_KEY.GENRES_TV],
  })
}
