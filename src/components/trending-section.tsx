import { useState } from 'react'

import { TRENDING_TABS } from '@/constants'
import { TrendingParamsType } from '@/lib/schemas/tmdb.schema'
import { useGetTrendingQuery } from '@/lib/tanstack-query/use-tmdb'
import MediaTabs from '@/components/media-tabs'

export default function TrendingSection() {
  const [trendingType, setTrendingType] = useState<TrendingParamsType['trendingType']>(TRENDING_TABS[0].value)

  const { data, isLoading, isSuccess } = useGetTrendingQuery({ trendingType, timeWindow: 'day' })

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
