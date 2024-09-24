import { useQuery } from '@tanstack/react-query'

import discoverApi from '@/apis/discover.api'
import { DiscoverQueryType, MediaType } from '@/lib/schemas/discover.schema'

export function useGetDiscoverQuery(params: MediaType, query: DiscoverQueryType) {
  return useQuery({
    queryFn: () => discoverApi.getList(params, query),
    queryKey: ['discover', params, query],
  })
}
