import { MediaCard, MediaCardSkeleton } from '@/components/media-card'
import { MOVIE_SORT_LIST } from '@/constants'
import useFilteredMediaParams from '@/hooks/useQueryParamsFiltered'
import { useGetDiscoverMoviesQuery } from '@/lib/tanstack-query/use-movies'

export default function MovieList() {
  const filteredMediaParams = useFilteredMediaParams(MOVIE_SORT_LIST)

  const discoverMoviesQuery = useGetDiscoverMoviesQuery({ sortBy: filteredMediaParams?.sortBy })

  if (discoverMoviesQuery.isLoading)
    return (
      <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 md:gap-4 lg:grid-cols-5 xl:grid-cols-6">
        {Array.from({ length: 12 }).map((_, index) => (
          <MediaCardSkeleton key={index} />
        ))}
      </div>
    )

  return discoverMoviesQuery.isSuccess ? (
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
  ) : null
}
