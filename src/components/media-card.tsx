import { Link } from 'react-router-dom'

import { PATH } from '@/constants/path'
import { Skeleton } from '@/components/ui/skeleton'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import { Card, CardContent, CardDescription, CardTitle } from '@/components/ui/card'
import { CircularProgressBar, MovieSkeletonIcon } from '@/components/icons'
import placeholderPoster from '/placeholder-poster.svg'

interface Props {
  id: number
  title: string
  mediaType: 'movie' | 'tv'
  posterPath?: string
  releaseDate: string
  voteAverage: number
}

function MediaCard({ id, mediaType, posterPath, releaseDate, title, voteAverage }: Props) {
  const percent = Math.round(voteAverage * 10)

  return (
    <Card>
      <Link to={`${PATH.MOVIES}/${id}`} className="flex h-full flex-col">
        <AspectRatio ratio={2 / 3}>
          <img src={posterPath || placeholderPoster} alt={title} className="size-full rounded-t-xl object-cover" />
          {mediaType === 'tv' ? (
            <div className="absolute right-1 top-1 rounded bg-background p-1 text-sm text-foreground shadow-md">
              TV Series
            </div>
          ) : null}
          <CircularProgressBar percent={percent} className="absolute bottom-0 left-2 translate-y-1/2" />
        </AspectRatio>
        <CardContent className="flex grow flex-col p-4 pt-6">
          <CardTitle className="mb-2 line-clamp-2 leading-normal">{title}</CardTitle>
          <CardDescription className="mt-auto text-white">{releaseDate}</CardDescription>
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
