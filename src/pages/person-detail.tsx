import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { LazyLoadImage } from 'react-lazy-load-image-component'

import { cn } from '@/utils'
import { useGetPersonCombinedCreditsQuery, useGetPersonDetailQuery } from '@/lib/tanstack-query/use-people'

import { Heading } from '@/components/common'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { MediaCard } from '@/components/media-card'

export default function PersonDetailPage() {
  const { personId } = useParams<{ personId: string }>()

  const [isImageLoaded, setIsImageLoaded] = useState(false)

  const getPersonDetailQuery = useGetPersonDetailQuery(Number(personId))
  const getPersonCombinedCreditsQuery = useGetPersonCombinedCreditsQuery(Number(personId))

  return (
    <main>
      <div className="container sm:px-6 lg:px-8">
        {getPersonDetailQuery.isSuccess ? (
          <div className="lg:grid lg:grid-cols-[220px_minmax(0,1fr)]">
            <div className="size-2/3 xs:size-1/2 md:size-1/3 lg:size-full">
              <Avatar asChild className="size-full rounded-none">
                <AspectRatio ratio={4 / 5}>
                  {getPersonDetailQuery.data.data.profilePath ? (
                    <LazyLoadImage
                      src={getPersonDetailQuery.data.data.profilePath}
                      alt={getPersonDetailQuery.data.data.name}
                      onLoad={() => setIsImageLoaded(true)}
                      className={cn('size-full object-cover transition', {
                        'blur-md': !isImageLoaded,
                      })}
                    />
                  ) : (
                    <AvatarFallback className="rounded-none">{getPersonDetailQuery.data.data.name}</AvatarFallback>
                  )}
                </AspectRatio>
              </Avatar>
            </div>
            <div className="lg:px-8 lg:py-4">
              <h1 className="text-lg font-bold text-foreground sm:text-2xl">{getPersonDetailQuery.data.data.name}</h1>
              <p className="mt-4 text-foreground">{getPersonDetailQuery.data.data.biography}</p>
            </div>
          </div>
        ) : null}
        <div>
          <Heading className="mt-10">Medias</Heading>
          {getPersonCombinedCreditsQuery.isSuccess ? (
            <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 md:gap-4 lg:grid-cols-5 xl:grid-cols-6">
              {getPersonCombinedCreditsQuery.data.data.cast.map((item) => (
                <MediaCard
                  key={item.id}
                  mediaType={item.mediaType}
                  id={item.id}
                  releaseDate={item.mediaType === 'movie' ? item.releaseDate : item.firstAirDate}
                  title={item.mediaType === 'movie' ? item.title : item.name}
                  voteAverage={item.voteAverage}
                  posterPath={item.posterPath ?? undefined}
                />
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </main>
  )
}
