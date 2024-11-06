import { useState } from 'react'
import { useParams } from 'react-router-dom'

import { MediaType } from '@/lib/schemas/common-media.schema'

import { Heading } from '@/components/common'
import { cn } from '@/utils'
import { CastList } from '@/components/media-detail'
import { MovieInformation } from '@/components/movie-detail'

export default function MediaInfo() {
  const [isExtended, setIsExtended] = useState(false)

  const params = useParams<Record<'movieId' | 'tvId', string>>()
  const mediaId = Number(params.movieId || params.tvId)
  const mediaType: MediaType = params.movieId ? 'movie' : 'tv'

  return (
    <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_220px] lg:gap-8">
      <CastList isExtended={isExtended} setIsExtended={setIsExtended} />

      {mediaType === 'movie' ? <MovieInformation isSticky={isExtended} movieId={mediaId} /> : null}
    </div>
  )
}
