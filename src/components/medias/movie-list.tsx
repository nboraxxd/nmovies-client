import { useEffect, useState } from 'react'

import useFilteredMediaParams from '@/hooks/use-filtered-media-params'
import { DiscoverMoviesQueryType } from '@/lib/schemas/movies.schema'
import { useGetDiscoverMoviesQuery } from '@/lib/tanstack-query/use-movies'

import { MediaCard, MediaCardSkeleton } from '@/components/media-card'
import { PaginationWithLinks } from '@/components/ui/pagination-with-link'
import { Skeleton } from '@/components/ui/skeleton'

export default function MovieList() {
  const [totalPage, setTotalPage] = useState<number>()

  const filteredMediaParams = useFilteredMediaParams<DiscoverMoviesQueryType>()

  const discoverMoviesQuery = useGetDiscoverMoviesQuery(filteredMediaParams)

  useEffect(() => {
    if (discoverMoviesQuery.isSuccess) {
      console.log(discoverMoviesQuery.data.pagination.totalPages)
      setTotalPage(
        discoverMoviesQuery.data?.pagination.totalPages <= 500 ? discoverMoviesQuery.data.pagination.totalPages : 500
      )
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [discoverMoviesQuery.data?.pagination.totalPages])

  return (
    <>
      {discoverMoviesQuery.isLoading ? (
        <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 md:gap-4 lg:grid-cols-5 xl:grid-cols-6">
          {Array.from({ length: 12 }).map((_, index) => (
            <MediaCardSkeleton key={index} />
          ))}
        </div>
      ) : null}
      {discoverMoviesQuery.isSuccess ? (
        <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 md:gap-4 lg:grid-cols-5 xl:grid-cols-6">
          {discoverMoviesQuery.data.data.map((movie) => (
            <MediaCard
              key={movie.id}
              mediaType="movie"
              id={movie.id}
              releaseDate={movie.releaseDate}
              title={movie.title}
              voteAverage={movie.voteAverage}
              posterPath={movie.posterPath ?? undefined}
            />
          ))}
        </div>
      ) : null}

      {totalPage ? (
        totalPage > 1 ? (
          <PaginationWithLinks page={filteredMediaParams.page || 1} totalPage={totalPage} />
        ) : null
      ) : (
        <div className="mx-auto mt-5 flex w-full justify-center gap-1">
          {Array.from({ length: 7 }).map((_, i) => (
            <Skeleton key={i} className="size-9" />
          ))}
        </div>
      )}
    </>
  )
}
