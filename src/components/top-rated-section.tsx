import { useState } from 'react'

import { TOP_RATED_TABS } from '@/constants'

import MediaTabs from '@/components/media-tabs'
import { MediaType } from '@/lib/schemas/common-media.schema'
import { useGetTopRatedQuery } from '@/lib/tanstack-query/use-medias'

export default function TopRatedSection() {
  const [topRatedType, setTopRatedType] = useState<MediaType>(TOP_RATED_TABS[0].value)

  const { data, isSuccess, isLoading } = useGetTopRatedQuery(topRatedType)

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
