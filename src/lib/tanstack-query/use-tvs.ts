import { useQuery } from '@tanstack/react-query'

import tvsApi from '@/apis/tvs.api'
import { PageQueryType } from '@/lib/schemas/common-media.schema'
import { DiscoverTvsQueryType, TvIdParamsType } from '@/lib/schemas/tv.schema'

export function useGetDiscoverTvQuery(query?: DiscoverTvsQueryType) {
  return useQuery({
    queryFn: () => tvsApi.discoverTvs(query),
    queryKey: ['discoverTv', query],
  })
}

export function useGetTvDetailQuery(tvId: number) {
  return useQuery({
    queryFn: () => tvsApi.getTvDetail(tvId),
    queryKey: ['tvDetail', tvId],
  })
}

export function useGetRecommendedTvsQuery(params: TvIdParamsType & PageQueryType) {
  return useQuery({
    queryFn: () => tvsApi.getRecommendedTvs(params),
    queryKey: ['recommendedTvs', params],
  })
}
