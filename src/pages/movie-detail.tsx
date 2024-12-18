import { useParams } from 'react-router-dom'

import {
  useGetMovieCreditsQuery,
  useGetMovieDetailQuery,
  useGetRecommendedMoviesQuery,
} from '@/lib/tanstack-query/use-movies'
import { useAuthStore } from '@/lib/stores/auth-store'

import { Heading } from '@/components/common'
import { Separator } from '@/components/ui/separator'
import { MediaCard, MediaCardSkeleton } from '@/components/media-card'
import { Banner, BannerSkeleton, MediaInfo } from '@/components/media-detail'
import ReviewForm, { ReviewFormSkeleton } from '@/components/form/review-form'
import ReviewList, { ReviewListSkeleton } from '@/components/media-detail/review-list'

export default function MovieDetailPage() {
  const { movieId } = useParams<{ movieId: string }>()

  const isAuth = useAuthStore((state) => state.isAuth)

  const getMovieDetailQuery = useGetMovieDetailQuery(Number(movieId))
  const movieDetail = getMovieDetailQuery.isSuccess ? getMovieDetailQuery.data.data : null

  const getMovieCreditsQuery = useGetMovieCreditsQuery(Number(movieId))

  const directors = getMovieCreditsQuery.data?.data.crew
    .filter((item) => item.job === 'Director')
    .map((director) => director.name)

  const writers = getMovieCreditsQuery.data?.data.crew
    .filter((item) => item.department === 'Writer')
    .map((writer) => writer.name)

  const screenplays = getMovieCreditsQuery.data?.data.crew
    .filter((item) => item.job === 'Screenplay')
    .map((screenplay) => screenplay.name)

  const getRecommendedMoviesQuery = useGetRecommendedMoviesQuery({ movieId: Number(movieId) })
  const recommendedMovies = getRecommendedMoviesQuery.isSuccess ? getRecommendedMoviesQuery.data.data : []

  return (
    <main>
      {getMovieDetailQuery.isLoading || getMovieCreditsQuery.isLoading ? <BannerSkeleton /> : null}
      {movieDetail && getMovieCreditsQuery.isSuccess ? (
        <Banner
          title={movieDetail.title}
          releaseDate={movieDetail.releaseDate}
          overview={movieDetail.overview}
          voteAverage={movieDetail.voteAverage}
          directors={directors ?? []}
          screenplays={screenplays ?? []}
          writers={writers ?? []}
          genres={movieDetail.genres}
          backdrop={movieDetail.backdropPath}
          poster={movieDetail.posterPath}
          certification={movieDetail.certification}
        />
      ) : null}

      <div className="container mt-10 sm:px-6 lg:px-8">
        <MediaInfo key={movieId} />

        <section>
          <div className="mt-10">
            <Heading className="mb-5">Reviews</Heading>
            <div className="w-full lg:max-w-[calc(100%-252px)]">
              {isAuth && getMovieDetailQuery.isLoading ? (
                <>
                  <ReviewFormSkeleton />
                  <Separator className="my-6" />
                </>
              ) : null}
              {getMovieDetailQuery.isLoading ? <ReviewListSkeleton /> : null}
              {movieDetail ? (
                <>
                  {isAuth ? (
                    <>
                      <ReviewForm
                        mediaId={movieDetail.id}
                        mediaPoster={movieDetail.posterPath}
                        mediaReleaseDate={movieDetail.releaseDate}
                        mediaTitle={movieDetail.title}
                        mediaType="movie"
                      />
                      <Separator className="my-6" />
                    </>
                  ) : null}
                  <ReviewList mediaId={movieDetail.id} mediaType="movie" />
                </>
              ) : null}
            </div>
          </div>

          <div className="mt-10">
            <Heading>You may also like</Heading>
            {getRecommendedMoviesQuery.isLoading ? (
              <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 md:gap-4 lg:grid-cols-5 xl:grid-cols-6">
                {Array.from({ length: 12 }).map((_, index) => (
                  <MediaCardSkeleton key={index} />
                ))}
              </div>
            ) : null}
            {recommendedMovies.length > 0 ? (
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
                    isFavorite={item.isFavorite}
                  />
                ))}
              </div>
            ) : null}
            {getRecommendedMoviesQuery.isSuccess && recommendedMovies.length === 0 ? (
              <p className="mt-8">Don't have any recommended movies or tv shows</p>
            ) : null}
          </div>
        </section>
      </div>
    </main>
  )
}
