import { Dispatch, SetStateAction } from 'react'

import { TopRatedResponseType, TrendingResponseType } from '@/lib/schemas/tmdb.schema'
import { MovieCard, MovieCardSkeleton } from '@/components/movie-card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import placeholderPoster from '/placeholder-poster.svg'

interface Props<T extends string> {
  heading: string
  isLoading: boolean
  isSuccess: boolean
  value: T
  setValue: Dispatch<SetStateAction<T>>
  medias: TrendingResponseType['data'] | TopRatedResponseType['data'] | undefined
  tabs: readonly { name: string; value: string }[]
}

export default function MediaTabs<T extends string>(props: Props<T>) {
  const { heading, isLoading, isSuccess, medias, setValue, tabs, value } = props

  return (
    <Tabs defaultValue={tabs[0].value} onValueChange={(value) => setValue(value as T)} className="mt-10">
      <div className="flex items-center gap-4">
        <h2 className="text-xl font-semibold">{heading}</h2>
        <TabsList>
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
        {isLoading ? Array.from(Array(12)).map((_, i) => <MovieCardSkeleton key={i} />) : null}
        {isSuccess && medias
          ? medias
              .slice(0, 12)
              .map((item) => (
                <MovieCard
                  key={item.id}
                  title={item.media_type === 'movie' ? item.title : item.name}
                  mediaType={item.media_type}
                  posterPath={item.poster_path || placeholderPoster}
                  releaseDate={item.media_type === 'movie' ? item.release_date : item.first_air_date}
                  voteAverage={item.vote_average}
                />
              ))
          : null}
      </TabsContent>
    </Tabs>
  )
}
