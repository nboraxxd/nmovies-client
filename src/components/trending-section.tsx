import { useEffect, useState } from 'react'

import { TRENDING_TABS } from '@/constants'
import { TrendingParamsType } from '@/lib/schemas/trending.shema'
import { useGetTrendingQuery } from '@/lib/tanstack-query/use-medias'
import MediaTabs from '@/components/media-tabs'
import http from '@/utils/http'

export default function TrendingSection() {
  const [trendingType, setTrendingType] = useState<TrendingParamsType['trendingType']>(TRENDING_TABS[0].value)

  const { data, isLoading, isSuccess } = useGetTrendingQuery({ trendingType, timeWindow: 'day' })

  useEffect(() => {
    ;(async () => {
      const provices = await http.get('/p', { baseURL: 'https://provinces.open-api.vn/api' })
      console.log('🔥 ~ ; ~ provices:', provices)
    })()
  }, [])

  return (
    <MediaTabs
      heading="Trending"
      value={trendingType}
      setValue={setTrendingType}
      medias={data?.data}
      isLoading={isLoading}
      isSuccess={isSuccess}
      tabs={TRENDING_TABS}
    />
  )
}
