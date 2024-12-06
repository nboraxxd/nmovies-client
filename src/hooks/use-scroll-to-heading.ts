import useFilteredMediaParams from '@/hooks/use-filtered-media-params'
import useWindowScroll from '@/hooks/use-window-scroll'
import { DiscoverMoviesQueryType } from '@/lib/schemas/movies.schema'
import { DiscoverTvsQueryType } from '@/lib/schemas/tv.schema'
import { useEffect } from 'react'

export default function useScrollToHeading(headingOffsetTop: number) {
  const [_, scrollTo] = useWindowScroll()
  const filteredMediaParams = useFilteredMediaParams<DiscoverMoviesQueryType | DiscoverTvsQueryType>()

  useEffect(() => {
    if (headingOffsetTop > 0) {
      scrollTo({ top: headingOffsetTop, behavior: 'smooth' })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filteredMediaParams.page])
}
