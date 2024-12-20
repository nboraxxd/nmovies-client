import { useEffect, useState } from 'react'
import { keepPreviousData, useInfiniteQuery, useQuery, useQueryClient } from '@tanstack/react-query'

import mediasApi from '@/apis/medias.api'
import trendingApi from '@/apis/trending.api'
import { QUERY_KEY } from '@/constants/tanstack-key'
import { SearchType } from '@/lib/schemas/search.schema'
import { TrendingParamsType } from '@/lib/schemas/trending.shema'
import { MediaType, PageQueryType } from '@/lib/schemas/common-media.schema'

export function useGetTrendingQuery(params: TrendingParamsType & PageQueryType) {
  return useQuery({
    queryFn: () => trendingApi.trending(params),
    queryKey: [QUERY_KEY.TRENDING, params],
    placeholderData: keepPreviousData,
  })
}

export function useGetTopRatedQuery(type: MediaType, query?: PageQueryType) {
  return useQuery({
    queryFn: () => mediasApi.topRated(type, query),
    queryKey: [QUERY_KEY.TOP_RATED, type, query],
    placeholderData: keepPreviousData,
  })
}

export function useSearch(payload: { type: Exclude<SearchType['type'], undefined>; query: string; page?: number }) {
  const { page, query, type } = payload

  const [isInitialRender, setIsInitialRender] = useState(true)

  const queryClient = useQueryClient()

  useEffect(() => {
    if (isInitialRender) {
      setIsInitialRender(false)
      return
    }

    return () => {
      queryClient.removeQueries({ queryKey: [QUERY_KEY.SEARCH, query, type] })
    }
  }, [isInitialRender, query, queryClient, type])

  return useInfiniteQuery({
    queryFn: ({ pageParam }) => mediasApi.search({ query, type, page: pageParam }),
    queryKey: [QUERY_KEY.SEARCH, query, type],
    getNextPageParam: (lastPage) =>
      lastPage.pagination.currentPage < lastPage.pagination.totalPages
        ? lastPage.pagination.currentPage + 1
        : undefined,
    initialPageParam: page || 1,
    enabled: !!query,
    // staleTime: 1000 * 60 * 60, // 1 hour
  })
}
