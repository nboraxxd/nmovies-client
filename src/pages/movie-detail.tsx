import { useState } from 'react'
import { useParams } from 'react-router-dom'

import {
  useGetMovieCreditsQuery,
  useGetMovieDetailQuery,
  useGetRecommendedMoviesQuery,
} from '@/lib/tanstack-query/use-movies'

import { Heading } from '@/components/common'
import { MediaCard } from '@/components/media-card'
import { Banner, MediaInfo } from '@/components/media-detail'

export default function MovieDetailPage() {
  const [isTest, setIsTest] = useState(false)

  const { movieId } = useParams<{ movieId: string }>()

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
          backdrop={movieDetail.backdropPath}
          poster={movieDetail.posterPath}
          certification={movieDetail.certification}
        />
      ) : null}

      <div className="container mt-10 sm:px-6 lg:px-8">
        <MediaInfo key={movieId} />
        <section className="mt-10">
          <Heading>You may also like</Heading>
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
                />
              ))}
            </div>
          ) : (
            <p>No recommended movies</p>
          )}
        </section>
      </div>
      <div>
        <button onClick={() => setIsTest(!isTest)}>Test</button>
        <div>{isTest ? Array.from({ length: 6 }).map((_, i) => <p key={i}>Test {i + 1}</p>) : null}</div>
      </div>
    </main>
  )
}
