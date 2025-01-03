import { useParams } from 'react-router-dom'
import { CaretSortIcon } from '@radix-ui/react-icons'

import useCastLimitByViewport from '@/hooks/use-cast-limit-by-viewport'
import { useGetMovieCreditsQuery } from '@/lib/tanstack-query/use-movies'
import { useGetTvAggregateCreditsQuery } from '@/lib/tanstack-query/use-tvs'

import { Heading } from '@/components/common'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { CastCard, CastCardSkeleton } from '@/components/media-detail'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'

interface Props {
  isExtended: boolean
  setIsExtended: React.Dispatch<React.SetStateAction<boolean>>
}

function MovieCastList(props: Props) {
  const { isExtended, setIsExtended } = props

  const { movieId } = useParams<{ movieId: string }>()

  const castLimit = useCastLimitByViewport()

  const { data, isSuccess, isLoading } = useGetMovieCreditsQuery(Number(movieId))

  return (
    <section>
      <Heading>Cast</Heading>
      {isLoading ? (
        <div className="mt-6 grid grid-cols-2 gap-2 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 md:gap-3 xl:grid-cols-6">
          {Array.from({ length: castLimit }).map((_, i) => (
            <CastCardSkeleton key={i} />
          ))}
        </div>
      ) : null}
      {isSuccess ? (
        <Collapsible open={isExtended} onOpenChange={setIsExtended}>
          <div className="mt-6 grid grid-cols-2 gap-2 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 md:gap-3 xl:grid-cols-6">
            {data.data.cast.slice(0, castLimit).map((actor) => (
              <CastCard
                key={actor.id}
                avatarUrl={actor.profilePath ?? undefined}
                character={actor.character}
                id={actor.id}
                name={actor.name}
              />
            ))}
            <CollapsibleContent asChild>
              <>
                {data.data.cast.slice(castLimit, 32).map((actor) => (
                  <CastCard
                    key={actor.id}
                    avatarUrl={actor.profilePath ?? undefined}
                    character={actor.character}
                    id={actor.id}
                    name={actor.name}
                  />
                ))}
              </>
            </CollapsibleContent>
          </div>
          {data.data.cast.length > 6 ? (
            <div className="mt-1.5 text-center">
              <CollapsibleTrigger asChild>
                <Button variant="ghost">
                  <CaretSortIcon className="size-4" />
                  <span>{isExtended ? 'Show less' : 'Show more'}</span>
                </Button>
              </CollapsibleTrigger>
            </div>
          ) : null}
        </Collapsible>
      ) : null}
    </section>
  )
}

function TvCastList(props: Props) {
  const { isExtended, setIsExtended } = props

  const { tvId } = useParams<{ tvId: string }>()

  const castLimit = useCastLimitByViewport()

  const { data, isSuccess, isLoading } = useGetTvAggregateCreditsQuery(Number(tvId))

  return (
    <section>
      <Heading>Cast</Heading>
      {isLoading ? (
        <>
          <div className="mt-6 grid grid-cols-2 gap-2 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 md:gap-3 xl:grid-cols-6">
            {Array.from({ length: castLimit }).map((_, i) => (
              <CastCardSkeleton key={i} />
            ))}
          </div>
          <div className="flex justify-center">
            <Skeleton className="mt-1.5 h-9 w-1/5" />
          </div>
        </>
      ) : null}
      {isSuccess ? (
        <Collapsible open={isExtended} onOpenChange={setIsExtended}>
          <div className="mt-6 grid grid-cols-2 gap-2 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 md:gap-3 xl:grid-cols-6">
            {data.data.cast.slice(0, castLimit).map((actor) => (
              <CastCard
                key={actor.id}
                avatarUrl={actor.profilePath ?? undefined}
                character={actor.roles.map((role) => role.character).join(', ')}
                id={actor.id}
                name={actor.name}
              />
            ))}
            <CollapsibleContent asChild>
              <>
                {data.data.cast.slice(castLimit, 32).map((actor) => (
                  <CastCard
                    key={actor.id}
                    avatarUrl={actor.profilePath ?? undefined}
                    character={actor.roles.map((role) => role.character).join(', ')}
                    id={actor.id}
                    name={actor.name}
                  />
                ))}
              </>
            </CollapsibleContent>
          </div>
          {data.data.cast.length > 6 ? (
            <div className="mt-1.5 text-center">
              <CollapsibleTrigger asChild>
                <Button variant="ghost">
                  <CaretSortIcon className="size-4" />
                  <span>{isExtended ? 'Show less' : 'Show more'}</span>
                </Button>
              </CollapsibleTrigger>
            </div>
          ) : null}
        </Collapsible>
      ) : null}
    </section>
  )
}

export { MovieCastList, TvCastList }
