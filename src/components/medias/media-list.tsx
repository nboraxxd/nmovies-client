import { useLocation, useNavigate } from 'react-router-dom'
import { UseQueryResult } from '@tanstack/react-query'

import { PATH } from '@/constants/path'
import useLimitTotalPages from '@/hooks/use-limit-total-page'
import useScrollToHeading from '@/hooks/use-scroll-to-heading'
import useFilteredMediaParams from '@/hooks/use-filtered-media-params'
import { useGetDiscoverTvsQuery } from '@/lib/tanstack-query/use-tvs'
import { useGetDiscoverMoviesQuery } from '@/lib/tanstack-query/use-movies'
import { DiscoverTvsQueryType, DiscoverTvsResponseType } from '@/lib/schemas/tv.schema'
import { DiscoverMoviesQueryType, DiscoverMoviesResponseType } from '@/lib/schemas/movies.schema'

import { Skeleton } from '@/components/ui/skeleton'
import { PaginationWithLinks } from '@/components/ui/pagination-with-link'
import { NotFoundMedia, NotFoundMediaReset } from '@/components/medias'
import { MediaCard, MediaCardSkeleton } from '@/components/media-card'

function MovieList({ headingOffsetTop }: { headingOffsetTop: number }) {
  const filteredMediaParams = useFilteredMediaParams<DiscoverMoviesQueryType>()
  const discoverMoviesQuery = useGetDiscoverMoviesQuery(filteredMediaParams)

  useScrollToHeading(headingOffsetTop)

  return <MediaList currentPage={filteredMediaParams.page || 1} discoverQuery={discoverMoviesQuery} />
}

function TvList({ headingOffsetTop }: { headingOffsetTop: number }) {
  const filteredMediaParams = useFilteredMediaParams<DiscoverTvsQueryType>()
  const discoverMoviesQuery = useGetDiscoverTvsQuery(filteredMediaParams)

  useScrollToHeading(headingOffsetTop)

  return <MediaList currentPage={filteredMediaParams.page || 1} discoverQuery={discoverMoviesQuery} />
}

function MediaList({
  currentPage,
  discoverQuery,
}: {
  currentPage: number
  discoverQuery: UseQueryResult<DiscoverMoviesResponseType | DiscoverTvsResponseType>
}) {
  const { pathname } = useLocation()

  const navigate = useNavigate()
  const limitTotalPages = useLimitTotalPages(discoverQuery.data?.pagination.totalPages)

  return (
    <>
      {discoverQuery.isLoading ? (
        <>
          <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 md:gap-4 lg:grid-cols-5 xl:grid-cols-6">
            {Array.from({ length: 12 }).map((_, index) => (
              <MediaCardSkeleton key={index} />
            ))}
          </div>
          {!limitTotalPages ? (
            <div className="mx-auto mt-5 flex w-full justify-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Skeleton key={i} className="size-9" />
              ))}
            </div>
          ) : null}
        </>
      ) : null}
      {discoverQuery.isSuccess ? (
        discoverQuery.data.data.length > 0 ? (
          <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 md:gap-4 lg:grid-cols-5 xl:grid-cols-6">
            {discoverQuery.data.data.map((item) => (
              <MediaCard
                key={item.id}
                mediaType={item.mediaType}
                id={item.id}
                releaseDate={item.mediaType === 'movie' ? item.releaseDate : item.firstAirDate}
                title={item.mediaType === 'movie' ? item.title : item.name}
                voteAverage={item.voteAverage}
                posterPath={item.posterPath ?? undefined}
                isFavorite={item.isFavorite}
              />
            ))}
          </div>
        ) : (
          <NotFoundMedia
            heading={`Oops. No ${pathname === PATH.MOVIES ? 'movie' : 'tv show'} found.`}
            desc="Try clearing the filter and searching again?"
          >
            <NotFoundMediaReset onClick={() => navigate(pathname === PATH.MOVIES ? PATH.MOVIES : PATH.TVS)} />
          </NotFoundMedia>
        )
      ) : null}
      {limitTotalPages && limitTotalPages > 1 ? (
        <PaginationWithLinks page={currentPage} totalPage={limitTotalPages} />
      ) : null}
    </>
  )
}

export { MovieList, TvList }
