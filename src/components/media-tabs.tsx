import { Dispatch, SetStateAction } from 'react'

import { MediaCard, MediaCardSkeleton } from '@/components/media-card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import placeholderPoster from '/placeholder-poster.svg'
import { TVDataType } from '@/lib/schemas/tv.schema'
import { MovieDataType } from '@/lib/schemas/movies.schema'

interface Props<T extends string> {
  heading: string
  isLoading: boolean
  isSuccess: boolean
  value: T
  setValue: Dispatch<SetStateAction<T>>
  medias?: (MovieDataType | TVDataType)[]
  tabs: readonly { name: string; value: string }[]
}

export default function MediaTabs<T extends string>(props: Props<T>) {
  const { heading, isLoading, isSuccess, medias, setValue, tabs, value } = props

  return (
    <Tabs defaultValue={tabs[0].value} onValueChange={(value) => setValue(value as T)} className="mt-10">
      <div className="flex flex-col items-start gap-1 sm:flex-row sm:items-center sm:gap-4">
        <h2 className="text-xl font-semibold">{heading}</h2>
        <TabsList className="self-end sm:self-start">
          {tabs.map(({ name, value }) => (
            <TabsTrigger key={value} value={value}>
              {name}
            </TabsTrigger>
          ))}
        </TabsList>
      </div>
      <TabsContent
        value={value}
        forceMount
        className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 md:gap-4 lg:grid-cols-5 xl:grid-cols-6"
      >
        {isLoading ? Array.from(Array(12)).map((_, i) => <MediaCardSkeleton key={i} />) : null}
        {isSuccess && medias
          ? medias
              .slice(0, 12)
              .map((item) => (
                <MediaCard
                  key={item.id}
                  id={item.id}
                  title={item.mediaType === 'movie' ? item.title : item.name}
                  mediaType={item.mediaType}
                  posterPath={item.posterPath || placeholderPoster}
                  releaseDate={item.mediaType === 'movie' ? item.releaseDate : item.firstAirDate}
                  voteAverage={item.voteAverage}
                />
              ))
          : null}
      </TabsContent>
    </Tabs>
  )
}
