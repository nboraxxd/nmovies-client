import { Link } from 'react-router-dom'

import { MediaType } from '@/lib/schemas/common-media.schema'
import { useGetGenresMovieQuery } from '@/lib/tanstack-query/use-movies'

import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'

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
    return <div>Loading...</div>
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
    <ToggleGroup type="multiple" className="flex-col items-start overflow-x-auto">
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
