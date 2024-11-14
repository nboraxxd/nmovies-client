import { Link } from 'react-router-dom'

import { MediaType } from '@/lib/schemas/common-media.schema'
import { useGetGenresMovieQuery } from '@/lib/tanstack-query/use-movies'

import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { Skeleton } from '@/components/ui/skeleton'

export default function GenresSelect({ type }: { type: MediaType }) {
  return (
    <>
      {type === 'movie' ? <GenresMovieSelect /> : null}
      {type === 'tv' ? <GenresTvSelect /> : null}
    </>
  )
}

function GenresMovieSelect() {
  const genresMovieQuery = useGetGenresMovieQuery()

  if (genresMovieQuery.isLoading) {
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

  const genresTop = genresMovieQuery.isSuccess
    ? genresMovieQuery.data.data.length % 2 === 0
      ? genresMovieQuery.data.data.slice(0, genresMovieQuery.data.data.length / 2)
      : genresMovieQuery.data.data.slice(0, genresMovieQuery.data.data.length / 2 + 1)
    : undefined

  const genresBottom = genresMovieQuery.isSuccess
    ? genresMovieQuery.data.data.length % 2 === 0
      ? genresMovieQuery.data.data.slice(genresMovieQuery.data.data.length / 2)
      : genresMovieQuery.data.data.slice(genresMovieQuery.data.data.length / 2 + 1)
    : undefined

  return genresMovieQuery.isSuccess && genresTop && genresBottom ? (
    <ToggleGroup type="multiple" className="mt-3 flex-col items-start overflow-x-auto">
      <div className="mx-auto flex w-fit flex-col gap-3">
        <div className="flex w-full gap-3">
          {genresTop.map(({ id, name }) => (
            <ToggleGroupItem key={id} value={id.toString()} aria-label={name} asChild>
              <Link to={`/movies?with_genres=${id}`} className="shrink-0">
                {name}
              </Link>
            </ToggleGroupItem>
          ))}
        </div>
        <div className="flex w-full justify-center gap-3">
          {genresBottom.map(({ id, name }) => (
            <ToggleGroupItem key={id} value={id.toString()} aria-label={name} asChild>
              <Link to={`/movies?with_genres=${id}`} className="shrink-0">
                {name}
              </Link>
            </ToggleGroupItem>
          ))}
        </div>
      </div>
    </ToggleGroup>
  ) : null
}

function GenresTvSelect() {
  return <div>Genres tv Select</div>
}
