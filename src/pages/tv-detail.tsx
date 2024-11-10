import { useParams } from 'react-router-dom'

import {
  useGetRecommendedTvsQuery,
  useGetTvAggregateCreditsQuery,
  useGetTvDetailQuery,
} from '@/lib/tanstack-query/use-tvs'

import { Heading } from '@/components/common'
import { MediaCard, MediaCardSkeleton } from '@/components/media-card'
import { Banner, BannerSkeleton, MediaInfo } from '@/components/media-detail'

export default function TvDetailPage() {
  const { tvId } = useParams<{ tvId: string }>()

  const getTvDetailQuery = useGetTvDetailQuery(Number(tvId))
  const tvDetail = getTvDetailQuery.isSuccess ? getTvDetailQuery.data.data : null

  const getTvAggregateCreditsQuery = useGetTvAggregateCreditsQuery(Number(tvId))

  const directors = getTvAggregateCreditsQuery.data?.data.crew
    .filter((item) => {
      const jobs = item.jobs.map((job) => job.job)
      return jobs.includes('Director')
    })
    .map((item) => item.name)

  const writers = getTvAggregateCreditsQuery.data?.data.crew
    .filter((item) => {
      const jobs = item.jobs.map((job) => job.job)
      return jobs.includes('Writer')
    })
    .map((item) => item.name)

  const screenplays = getTvAggregateCreditsQuery.data?.data.crew
    .filter((item) => {
      const jobs = item.jobs.map((job) => job.job)
      return jobs.includes('Screenplay')
    })
    .map((item) => item.name)

  const getRecommendedTvsQuery = useGetRecommendedTvsQuery({ tvId: Number(tvId) })
  const recommendedTvs = getRecommendedTvsQuery.isSuccess ? getRecommendedTvsQuery.data.data : []

  return (
    <main>
      {getTvDetailQuery.isLoading || getTvAggregateCreditsQuery.isLoading ? <BannerSkeleton /> : null}
      {tvDetail && getTvAggregateCreditsQuery.isSuccess ? (
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
        <MediaInfo key={tvId} />

        <section className="mt-10">
          <Heading>You may also like</Heading>
          {getRecommendedTvsQuery.isLoading ? (
            <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 md:gap-4 lg:grid-cols-5 xl:grid-cols-6">
              {Array.from({ length: 12 }).map((_, index) => (
                <MediaCardSkeleton key={index} />
              ))}
            </div>
          ) : null}
          {recommendedTvs.length > 0 ? (
            <>
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
            </>
          ) : null}
          {getRecommendedTvsQuery.isSuccess && recommendedTvs.length === 0 ? (
            <p className="mt-4 text-xl">Don't have any recommended movies or tv shows</p>
          ) : null}
        </section>
      </div>
    </main>
  )
}
