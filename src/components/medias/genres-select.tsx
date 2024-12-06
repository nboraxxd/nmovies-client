import { Link } from 'react-router-dom'
import queryString from 'query-string'

import { separateGenres } from '@/utils'
import useFilteredMediaParams from '@/hooks/use-filtered-media-params'
import { DiscoverTvsQueryType } from '@/lib/schemas/tv.schema'
import { useGetGenresTvQuery } from '@/lib/tanstack-query/use-tvs'
import { DiscoverMoviesQueryType } from '@/lib/schemas/movies.schema'
import { useGetGenresMovieQuery } from '@/lib/tanstack-query/use-movies'

import { Skeleton } from '@/components/ui/skeleton'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'

function GenresMovieSelect() {
  const genresMovieQuery = useGetGenresMovieQuery()
  const filteredMediaParams = useFilteredMediaParams<DiscoverMoviesQueryType>()

  const { genresTop, genresBottom } = separateGenres(genresMovieQuery.data?.data)

  if (genresMovieQuery.isLoading) {
    return <GenresLoading />
  }

  return genresTop && genresBottom ? (
    <ToggleGroup
      type="multiple"
      value={filteredMediaParams.withGenres ? filteredMediaParams.withGenres?.split(',') : []}
      className="mt-3 flex-col items-start overflow-x-auto"
    >
      <div className="mx-auto flex w-fit flex-col gap-3">
        <div className="flex w-full gap-3">
          {genresTop.map(({ id, name }) => (
            <ToggleItem key={id} id={id.toString()} name={name} filteredMediaParams={filteredMediaParams} />
          ))}
        </div>
        <div className="flex w-full justify-center gap-3">
          {genresBottom.map(({ id, name }) => (
            <ToggleItem key={id} id={id.toString()} name={name} filteredMediaParams={filteredMediaParams} />
          ))}
        </div>
      </div>
    </ToggleGroup>
  ) : null
}

function GenresTvSelect() {
  const genresMovieQuery = useGetGenresTvQuery()
  const filteredMediaParams = useFilteredMediaParams<DiscoverTvsQueryType>()

  const { genresTop, genresBottom } = separateGenres(genresMovieQuery.data?.data)

  if (genresMovieQuery.isLoading) {
    return <GenresLoading />
  }

  return genresTop && genresBottom ? (
    <ToggleGroup
      type="multiple"
      value={filteredMediaParams.withGenres ? filteredMediaParams.withGenres?.split(',') : []}
      className="mt-3 flex-col items-start overflow-x-auto"
    >
      <div className="mx-auto flex w-fit flex-col gap-3">
        <div className="flex w-full gap-3">
          {genresTop.map(({ id, name }) => (
            <ToggleItem key={id} id={id.toString()} name={name} filteredMediaParams={filteredMediaParams} />
          ))}
        </div>
        <div className="flex w-full justify-center gap-3">
          {genresBottom.map(({ id, name }) => (
            <ToggleItem key={id} id={id.toString()} name={name} filteredMediaParams={filteredMediaParams} />
          ))}
        </div>
      </div>
    </ToggleGroup>
  ) : null
}

function GenresLoading() {
  return (
    <div className="mt-3 flex flex-col items-center justify-center gap-3 overflow-hidden">
      <div className="flex gap-3">
        {Array.from({ length: 8 }).map((_, index) => (
          <Skeleton key={index} className="h-9 w-20" />
        ))}
      </div>
      <div className="flex gap-3">
        {Array.from({ length: 7 }).map((_, index) => (
          <Skeleton key={index} className="h-9 w-20" />
        ))}
      </div>
    </div>
  )
}

function ToggleItem(props: {
  id: string
  name: string
  filteredMediaParams: DiscoverMoviesQueryType | DiscoverTvsQueryType
}) {
  const { id, name, filteredMediaParams } = props

  return (
    <ToggleGroupItem value={id} aria-label={name} asChild>
      <Link
        to={{
          search: queryString.stringify(
            {
              ...filteredMediaParams,
              page: undefined,
              withGenres:
                filteredMediaParams.withGenres && filteredMediaParams.withGenres.includes(id)
                  ? filteredMediaParams.withGenres
                      .split(',')
                      .filter((item) => item !== id)
                      .join(',')
                  : filteredMediaParams.withGenres
                    ? `${filteredMediaParams.withGenres},${id}`
                    : id,
            },
            { skipEmptyString: true }
          ),
        }}
        className="shrink-0"
      >
        {name}
      </Link>
    </ToggleGroupItem>
  )
}

export { GenresMovieSelect, GenresTvSelect }
