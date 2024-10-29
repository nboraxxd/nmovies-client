import http from '@/utils/http'
import { TrendingParamsType, TrendingResponseType } from '@/lib/schemas/trending.shema'
import { PageQueryType } from '@/lib/schemas/common-media.schema'

const trendingApi = {
  trending: async (params: TrendingParamsType & PageQueryType) => {
    const { trendingType, timeWindow, page } = params

    return http.get<TrendingResponseType>(`/trending/${trendingType}/${timeWindow}`, { params: { page } })
  },
}

export default trendingApi
