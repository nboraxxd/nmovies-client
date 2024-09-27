import { useState } from 'react'

import { TOP_RATED_TABS } from '@/constants/list'
import { TopRatedParamsType } from '@/lib/schemas/tmdb.schema'
import { useGetTopRatedQuery } from '@/lib/tanstack-query/use-tmdb'
import MediaTabs from '@/components/media-tabs'

export default function TopRatedSection() {
  const [topRatedType, setTopRatedType] = useState<TopRatedParamsType['topRatedType']>(TOP_RATED_TABS[0].value)

  const { data, isLoading, isSuccess } = useGetTopRatedQuery({ topRatedType })

  return (
    <MediaTabs
      heading="Top Rated"
      value={topRatedType}
      setValue={setTopRatedType}
      medias={data?.data}
      isLoading={isLoading}
      isSuccess={isSuccess}
      tabs={TOP_RATED_TABS}
    />
  )
}
