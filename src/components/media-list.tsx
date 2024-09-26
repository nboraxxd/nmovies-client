import { useState } from 'react'

import { TrendingParamsType } from '@/lib/schemas/tmdb.schema'
import { useGetTrendingQuery } from '@/lib/tanstack-query/use-tmdb'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { MovieCard, MovieCardSkeleton } from '@/components/movie-card'
import placeholderPoster from '/placeholder-poster.svg'

export default function MediaList() {
  const [mediaType, setMediaType] = useState<TrendingParamsType['trendingType']>('all')

  const getTrendingQuery = useGetTrendingQuery({ trendingType: mediaType, timeWindow: 'day' }, { page: 1 })

  return (
    <Tabs
      defaultValue="all"
      onValueChange={(value) => setMediaType(value as TrendingParamsType['trendingType'])}
      className="mt-10"
    >
      <TabsList>
        <TabsTrigger value="all">All</TabsTrigger>
        <TabsTrigger value="movie">Movie</TabsTrigger>
        <TabsTrigger value="tv">TV Show</TabsTrigger>
      </TabsList>
      <TabsContent
        value={mediaType}
        forceMount
        className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 md:gap-4 lg:grid-cols-5 xl:grid-cols-6"
      >
        {getTrendingQuery.isLoading ? Array.from(Array(12)).map((_, i) => <MovieCardSkeleton key={i} />) : null}
        {getTrendingQuery.isSuccess
          ? getTrendingQuery.data.data
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
