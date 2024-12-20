import { LoadMoreIndicator } from '@/components/common'
import { MediaCard, MediaCardSkeleton } from '@/components/media-card'
import { CastCard, CastCardSkeleton } from '@/components/media-detail'
import { NotFoundMedia } from '@/components/medias'
import useSanitizeSearch from '@/hooks/use-sanitize-search'
import { useSearch } from '@/lib/tanstack-query/use-medias'
import { cn } from '@/utils'
import { Fragment } from 'react'

export default function SearchResults() {
  const { query, type } = useSanitizeSearch()

  const wrapperClassName = cn(
    'mt-6 grid gap-2 md:gap-3',
    type === 'person'
      ? 'grid-cols-3 xs:grid-cols-4 sm:grid-cols-5 md:grid-cols-6 xl:grid-cols-7'
      : 'grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 xl:grid-cols-6'
  )

  const {
    isLoading,
    isSuccess,
    data: searchResults,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useSearch({ query, type: type || 'movie' })

  if (isLoading) {
    return (
      <div className={wrapperClassName}>
        {Array.from({ length: 12 }).map((_, index) => {
          if (type === 'person') {
            return <CastCardSkeleton key={index} />
          }
          return <MediaCardSkeleton key={index} />
        })}
      </div>
    )
  }

  if (!query) {
    return <NotFoundMedia heading="Try searching for something." className="mt-6 h-80 justify-center" />
  }

  return (
    <>
      <div className={wrapperClassName}>
        {isSuccess && searchResults.pages.length === 1 && searchResults.pages[0].data.length === 0 ? (
          <NotFoundMedia
            heading="Oops. No results found."
            desc="Try searching for something else?"
            className="col-span-full mt-0 h-80 justify-center"
          />
        ) : null}
        {isSuccess && searchResults.pages.length >= 1 && searchResults.pages[0].data.length > 0
          ? searchResults.pages.map((page, index) => (
              <Fragment key={index}>
                {page.data.map((item) => {
                  if (item.mediaType === 'person') {
                    return (
                      <CastCard
                        key={item.id}
                        id={item.id}
                        name={item.name}
                        character={item.knownForDepartment}
                        avatarUrl={item.profilePath ?? undefined}
                      />
                    )
                  }
                  return (
                    <MediaCard
                      key={item.id}
                      mediaType={item.mediaType}
                      id={item.id}
                      title={item.mediaType === 'movie' ? item.title : item.name}
                      releaseDate={item.mediaType === 'movie' ? item.releaseDate : item.firstAirDate}
                      voteAverage={item.voteAverage}
                      isFavorite={item.isFavorite}
                      posterPath={item.posterPath ?? undefined}
                    />
                  )
                })}
              </Fragment>
            ))
          : null}
      </div>
      {isSuccess ? (
        <LoadMoreIndicator
          fetchNextPage={fetchNextPage}
          hasNextPage={hasNextPage}
          isFetchingNextPage={isFetchingNextPage}
        />
      ) : null}
    </>
  )
}
