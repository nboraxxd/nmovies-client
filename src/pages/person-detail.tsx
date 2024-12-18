import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { LazyLoadImage } from 'react-lazy-load-image-component'

import { cn } from '@/utils'
import { useGetPersonCombinedCreditsQuery, useGetPersonDetailQuery } from '@/lib/tanstack-query/use-people'

import { Heading } from '@/components/common'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { MediaCard, MediaCardSkeleton } from '@/components/media-card'
import { Skeleton } from '@/components/ui/skeleton'

export default function PersonDetailPage() {
  const { personId } = useParams<{ personId: string }>()

  const [isImageLoaded, setIsImageLoaded] = useState(false)

  const getPersonDetailQuery = useGetPersonDetailQuery(Number(personId))
  const getPersonCombinedCreditsQuery = useGetPersonCombinedCreditsQuery(Number(personId))

  // Sử dụng hash map để loại bỏ các item trùng lặp
  const castCreditsMap: Record<string, boolean> = {}
  const castCombinedCredits = getPersonCombinedCreditsQuery.isSuccess
    ? getPersonCombinedCreditsQuery.data.data.cast.filter((item) => {
        const key = `${item.id}-${item.mediaType}`
        if (!castCreditsMap[key]) {
          castCreditsMap[key] = true
          return true
        }
        return false
      })
    : undefined

  return (
    <main>
      <div className="container sm:px-6 lg:px-8">
        {getPersonDetailQuery.isLoading ? (
          <div className="lg:grid lg:grid-cols-[220px_minmax(0,1fr)]">
            <div className="w-56">
              <AspectRatio ratio={4 / 5}>
                <Skeleton className="size-full rounded-none bg-foreground/15" />
              </AspectRatio>
            </div>
            <div className="mt-4 lg:mt-0 lg:px-8 lg:py-4">
              <Skeleton className="h-8 w-1/2 bg-foreground/15" />
              {Array.from({ length: 7 }).map((_, i) => (
                <Skeleton key={i} className="mt-2 h-5 w-full bg-foreground/15 last:w-1/2" />
              ))}
            </div>
          </div>
        ) : null}

        {getPersonDetailQuery.isSuccess ? (
          <div className="lg:grid lg:grid-cols-[220px_minmax(0,1fr)]">
            <Avatar asChild className="rounded-none">
              {getPersonDetailQuery.data.data.profilePath ? (
                <LazyLoadImage
                  src={getPersonDetailQuery.data.data.profilePath}
                  alt={getPersonDetailQuery.data.data.name}
                  onLoad={() => setIsImageLoaded(true)}
                  className={cn('size-2/5 object-cover transition md:size-1/3 lg:size-full', {
                    'blur-md': !isImageLoaded,
                  })}
                />
              ) : (
                <AvatarFallback className="rounded-none">{getPersonDetailQuery.data.data.name}</AvatarFallback>
              )}
            </Avatar>

            <div className="mt-4 lg:mt-0 lg:px-8 lg:py-4">
              <h1 className="text-lg font-bold text-foreground sm:text-2xl">{getPersonDetailQuery.data.data.name}</h1>
              <p className="mt-2 text-foreground">{getPersonDetailQuery.data.data.biography}</p>
            </div>
          </div>
        ) : null}
        <div>
          <Heading className="mt-10">Medias</Heading>
          {getPersonCombinedCreditsQuery.isLoading ? (
            <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 md:gap-4 lg:grid-cols-5 xl:grid-cols-6">
              {Array.from({ length: 12 }).map((_, index) => (
                <MediaCardSkeleton key={index} />
              ))}
            </div>
          ) : null}
          {getPersonCombinedCreditsQuery.isSuccess && castCombinedCredits ? (
            <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 md:gap-4 lg:grid-cols-5 xl:grid-cols-6">
              {castCombinedCredits.map((item) => (
                <MediaCard
                  key={`${item.id}-${item.mediaType}`}
                  mediaType={item.mediaType}
                  id={item.id}
                  releaseDate={item.mediaType === 'movie' ? item.releaseDate : item.firstAirDate}
                  title={item.mediaType === 'movie' ? item.title : item.name}
                  voteAverage={item.voteAverage}
                  posterPath={item.posterPath ?? undefined}
                  isFavorite={null}
                />
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </main>
  )
}
