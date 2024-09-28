import { CircularProgressBar, MovieSkeletonIcon } from '@/components/icons'
import { AspectRatio } from '@/components/ui/aspect-ratio'

import { Card, CardContent, CardDescription, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

interface Props {
  title: string
  mediaType: 'movie' | 'tv'
  posterPath: string
  releaseDate: string
  voteAverage: number
}

function MovieCard({ mediaType, posterPath, releaseDate, title, voteAverage }: Props) {
  const percent = Math.round(voteAverage * 10)
  const strokeColor = percent >= 70 ? 'green' : percent >= 50 ? 'orange' : 'red'

  return (
    <Card className="flex flex-col">
      <AspectRatio ratio={2 / 3}>
        <img src={posterPath} alt={title} className="h-full rounded-t-xl object-cover" />
        {mediaType === 'tv' ? (
          <div className="absolute right-1 top-1 rounded bg-background p-1 text-sm text-foreground shadow-md">
            TV Series
          </div>
        ) : null}
        <CircularProgressBar
          percent={percent}
          strokeColor={strokeColor}
          className="absolute bottom-0 left-2 translate-y-1/2"
        />
      </AspectRatio>
      <CardContent className="flex grow flex-col pt-6">
        <CardTitle className="mb-2 line-clamp-2 leading-normal">{title}</CardTitle>
        <CardDescription className="mt-auto text-white">{releaseDate}</CardDescription>
      </CardContent>
    </Card>
  )
}

function MovieCardSkeleton() {
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

export { MovieCard, MovieCardSkeleton }
