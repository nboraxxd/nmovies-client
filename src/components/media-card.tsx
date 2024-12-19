import { format } from 'date-fns'
import { Link } from 'react-router-dom'
import { HeartIcon } from 'lucide-react'

import { PATH } from '@/constants/path'
import { MediaType } from '@/lib/schemas/common-media.schema'

import { Skeleton } from '@/components/ui/skeleton'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import { Card, CardContent, CardDescription, CardTitle } from '@/components/ui/card'
import { LazyLoadImage } from '@/components/common'
import { CircularProgressBar, MovieSkeletonIcon } from '@/components/icons'
import placeholderPoster from '/placeholder-poster.svg'

interface Props {
  id: number | string
  title: string
  mediaType: MediaType
  posterPath?: string
  releaseDate: string
  voteAverage: number
  isFavorite?: boolean | null
}

function MediaCard({ id, mediaType, posterPath, releaseDate, title, voteAverage, isFavorite }: Props) {
  const percent = Math.round(voteAverage * 10)

  const _releaseDate = new Date(releaseDate)
  const formattedReleaseDate = !isNaN(_releaseDate.getTime()) ? format(_releaseDate, 'dd/MM/yyyy') : ''

  return (
    <Card className="h-full">
      <Link to={`${mediaType === 'movie' ? PATH.MOVIES : PATH.TVS}/${id}`} className="flex h-full flex-col">
        <AspectRatio ratio={2 / 3}>
          <LazyLoadImage src={posterPath || placeholderPoster} alt={title} className="rounded-t-xl" />
          {isFavorite ? (
            <HeartIcon className="absolute left-1 top-1 z-10 size-6 fill-primary/75 text-primary/0" />
          ) : null}
          {mediaType === 'tv' ? (
            <div className="absolute right-1 top-1 rounded bg-background p-1 text-sm text-foreground shadow-md">
              TV Shows
            </div>
          ) : null}
          <CircularProgressBar percent={percent} className="absolute bottom-0 left-2 translate-y-1/2" />
        </AspectRatio>
        <CardContent className="flex grow flex-col p-4 pt-6">
          <CardTitle className="mb-2 line-clamp-2 leading-normal">{title}</CardTitle>
          <CardDescription className="mt-auto text-white">{formattedReleaseDate}</CardDescription>
        </CardContent>
      </Link>
    </Card>
  )
}

function MediaCardSkeleton() {
  return (
    <Card className="flex flex-col">
      <div className="relative p-0 pt-[150%]">
        <Skeleton className="absolute left-0 top-0 size-full rounded-t-xl" />
        <MovieSkeletonIcon className="absolute left-1/2 top-1/2 size-24 -translate-x-1/2 -translate-y-1/2" />
      </div>
      <div className="p-6">
        <Skeleton className="h-6 w-full" />
        <Skeleton className="mt-2 h-5 w-3/4" />
      </div>
    </Card>
  )
}

export { MediaCard, MediaCardSkeleton }
