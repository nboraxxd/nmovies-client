import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { CaretSortIcon } from '@radix-ui/react-icons'

import { cn } from '@/utils'

import { Button } from '@/components/ui/button'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { Heading } from '@/components/common'
import { MediaCard } from '@/components/media-card'
import { CastCard, Banner } from '@/components/media-detail'
import { useGetRecommendedTvsQuery, useGetTvDetailQuery } from '@/lib/tanstack-query/use-tvs'

export default function TvDetailPage() {
  const [isExtended, setIsExtended] = useState(false)

  const { tvId } = useParams<{ tvId: string }>()

  const getTvDetailQuery = useGetTvDetailQuery(Number(tvId))
  const tvDetail = getTvDetailQuery.isSuccess ? getTvDetailQuery.data.data : null
  console.log('🔥 ~ TvDetailPage ~ tvDetail:', tvDetail)

  const directors = tvDetail?.aggregateCredits.crew
    .filter((crew) => crew.department === 'Director')
    .map((director) => director.name)
  const writers = tvDetail?.aggregateCredits.crew
    .filter((crew) => crew.department === 'Writer')
    .map((director) => director.name)
  const screenplays = tvDetail?.aggregateCredits.crew
    .filter((crew) => crew.department === 'Screenplay')
    .map((director) => director.name)

  const getRecommendedTvsQuery = useGetRecommendedTvsQuery({ tvId: Number(tvId) })
  const recommendedTvs = getRecommendedTvsQuery.isSuccess ? getRecommendedTvsQuery.data.data : []

  return (
    <main>
      {tvDetail ? (
        <Banner
          title={tvDetail.name}
          releaseDate={tvDetail.firstAirDate}
          overview={tvDetail.overview}
          voteAverage={tvDetail.voteAverage}
          directors={directors ?? []}
          screenplays={screenplays ?? []}
          writers={writers ?? []}
          genres={tvDetail.genres}
          backdrop={tvDetail.backdropPath}
          poster={tvDetail.posterPath}
          certification={tvDetail.certification}
        />
      ) : null}

      <div className="container mt-10 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_220px] lg:gap-8">
          {tvDetail ? (
            <section>
              <Heading>Cast</Heading>
              <Collapsible open={isExtended} onOpenChange={setIsExtended}>
                <div className="mt-6 grid grid-cols-2 gap-2 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 md:gap-3 xl:grid-cols-6">
                  {tvDetail.aggregateCredits.cast.slice(0, 6).map((actor) => (
                    <CastCard
                      key={actor.id}
                      avatarUrl={actor.profilePath ?? undefined}
                      character={actor.roles[0].character}
                      id={actor.id}
                      name={actor.name}
                    />
                  ))}
                  <CollapsibleContent asChild>
                    <>
                      {tvDetail.aggregateCredits.cast.slice(6, 32).map((actor) => (
                        <CastCard
                          key={actor.id}
                          avatarUrl={actor.profilePath ?? undefined}
                          character={actor.roles[0].character}
                          id={actor.id}
                          name={actor.name}
                        />
                      ))}
                    </>
                  </CollapsibleContent>
                </div>
                {tvDetail.aggregateCredits.cast.length > 6 ? (
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
          {tvDetail ? (
            <section className={cn('hidden lg:block', { 'sticky top-0 -mt-10 h-fit pt-10 pb-9 ': isExtended })}>
              <Heading>Infomation</Heading>
              <div className="mt-6">
                <h4 className="font-semibold">Original name</h4>
                <h3 className="mt-0.5">{tvDetail.originalName}</h3>
              </div>
              <div className="mt-3">
                <h4 className="font-semibold">Original country</h4>
                {tvDetail.originCountry.map((countryCode) => (
                  <img
                    key={countryCode}
                    src={`https://flagcdn.com/48x36/${countryCode.toLowerCase()}.png`}
                    className="mt-0.5 h-6 object-contain"
                  />
                ))}
              </div>
              <div className="mt-3">
                <h4 className="font-semibold">Status</h4>
                <h3 className="mt-0.5">{tvDetail.status}</h3>
              </div>
              {/* <div className="mt-3">
                <h4 className="font-semibold">Budget</h4>
                <h3 className="mt-0.5">{currencyFormatter(tvDetail.budget)}</h3>
              </div> */}
              {/* <div className="mt-3">
                <h4 className="font-semibold">Revenue</h4>
                <h3 className="mt-0.5">{currencyFormatter(tvDetail.revenue)}</h3>
              </div> */}
            </section>
          ) : null}
        </div>

        {recommendedTvs.length > 0 ? (
          <section className="mt-10">
            <Heading>You may also like</Heading>
            <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 md:gap-4 lg:grid-cols-5 xl:grid-cols-6">
              {recommendedTvs.map((item) => (
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
