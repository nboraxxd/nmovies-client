import { keepPreviousData, useQuery } from '@tanstack/react-query'

import trendingApi from '@/apis/trending.api'
import { TrendingParamsType } from '@/lib/schemas/trending.shema'
import { MediaType, PageQueryType } from '@/lib/schemas/common-media.schema'
import mediasApi from '@/apis/medias.api'

export function useGetTrendingQuery(params: TrendingParamsType & PageQueryType) {
  return useQuery({
    queryFn: () => trendingApi.trending(params),
    queryKey: ['trending', params],
    placeholderData: keepPreviousData,
  })
}

export function useGetTopRatedQuery(type: MediaType, query?: PageQueryType) {
  return useQuery({
    queryFn: () => mediasApi.topRated(type, query),
    queryKey: ['topRated', type, query],
    placeholderData: keepPreviousData,
  })
}
