import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { CaretSortIcon } from '@radix-ui/react-icons'

import { cn, currencyFormatter } from '@/utils'
import { useGetMovieDetailQuery, useGetRecommendedMoviesQuery } from '@/lib/tanstack-query/use-movies'
import { Button } from '@/components/ui/button'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { Heading } from '@/components/common'
import { CastCard, Banner } from '@/components/media-detail'
import { MediaCard } from '@/components/media-card'

export default function MovieDetailPage() {
  const [isExtended, setIsExtended] = useState(false)

  const { movieId } = useParams<{ movieId: string }>()

  const getMovieDetailQuery = useGetMovieDetailQuery(Number(movieId))
  const movieDetail = getMovieDetailQuery.isSuccess ? getMovieDetailQuery.data.data : null

  const directors = movieDetail?.credits.crew.filter((crew) => crew.job === 'Director').map((director) => director.name)
  const writers = movieDetail?.credits.crew.filter((crew) => crew.department === 'Writer').map((writer) => writer.name)
  const screenplays = movieDetail?.credits.crew
    .filter((crew) => crew.job === 'Screenplay')
    .map((screenplay) => screenplay.name)

  const getRecommendedMoviesQuery = useGetRecommendedMoviesQuery({ movieId: Number(movieId) })
  const recommendedMovies = getRecommendedMoviesQuery.isSuccess ? getRecommendedMoviesQuery.data.data : []

  return (
    <main>
      {movieDetail ? (
        <Banner
          title={movieDetail.title}
          releaseDate={movieDetail.releaseDate}
          overview={movieDetail.overview}
          voteAverage={movieDetail.voteAverage}
          directors={directors ?? []}
          screenplays={screenplays ?? []}
          writers={writers ?? []}
          genres={movieDetail.genres}
          backdrop={movieDetail.backdropPath || undefined}
          poster={movieDetail.posterPath || undefined}
          certification={movieDetail.certification || undefined}
        />
      ) : null}

      <div className="container mt-10 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_220px] lg:gap-8">
          {movieDetail ? (
            <section>
              <Heading>Cast</Heading>
              <Collapsible open={isExtended} onOpenChange={setIsExtended}>
                <div className="mt-6 grid grid-cols-2 gap-2 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 md:gap-3 xl:grid-cols-6">
                  {movieDetail.credits.cast.slice(0, 6).map((actor) => (
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
                      {movieDetail.credits.cast.slice(6, 32).map((actor) => (
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
                {movieDetail.credits.cast.length > 6 ? (
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
            </section>
          ) : null}
          {movieDetail ? (
            <section className={cn('hidden lg:block', { 'sticky top-0 -mt-10 h-fit pt-10 pb-9 ': isExtended })}>
              <Heading>Infomation</Heading>
              <div className="mt-6">
                <h4 className="font-semibold">Original name</h4>
                <h3 className="mt-0.5">{movieDetail.originalTitle}</h3>
              </div>
              <div className="mt-3">
                <h4 className="font-semibold">Original country</h4>
                {movieDetail.originCountry.map((countryCode) => (
                  <img
                    key={countryCode}
                    src={`https://flagcdn.com/48x36/${countryCode.toLowerCase()}.png`}
                    className="mt-0.5 h-6 object-contain"
                  />
                ))}
              </div>
              <div className="mt-3">
                <h4 className="font-semibold">Status</h4>
                <h3 className="mt-0.5">{movieDetail.status}</h3>
              </div>
              <div className="mt-3">
                <h4 className="font-semibold">Budget</h4>
                <h3 className="mt-0.5">{currencyFormatter(movieDetail.budget)}</h3>
              </div>
              <div className="mt-3">
                <h4 className="font-semibold">Revenue</h4>
                <h3 className="mt-0.5">{currencyFormatter(movieDetail.revenue)}</h3>
              </div>
            </section>
          ) : null}
        </div>

        {recommendedMovies.length > 0 ? (
          <section className="mt-10">
            <Heading>You may also like</Heading>
            <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 md:gap-4 lg:grid-cols-5 xl:grid-cols-6">
              {recommendedMovies.map((item) => (
                <MediaCard
                  key={item.id}
                  id={item.id}
                  title={item.mediaType === 'movie' ? item.title : item.name}
                  mediaType={item.mediaType}
                  posterPath={item.posterPath ?? undefined}
                  releaseDate={item.mediaType === 'movie' ? item.releaseDate : item.firstAirDate}
                  voteAverage={item.voteAverage}
                />
              ))}
            </div>
          </section>
        ) : null}
      </div>
    </main>
  )
}
