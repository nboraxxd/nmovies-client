import { useState } from 'react'
import { useParams } from 'react-router-dom'

import { MOVIE_DETAIL_INFO } from '@/constants'
import { cn, currencyFormatter } from '@/utils'
import { MediaType } from '@/lib/schemas/common-media.schema'
import { useGetTvDetailQuery } from '@/lib/tanstack-query/use-tvs'
import { useGetMovieDetailQuery } from '@/lib/tanstack-query/use-movies'

import { Heading } from '@/components/common'
import { Skeleton } from '@/components/ui/skeleton'
import { MovieCastList, TvCastList } from '@/components/media-detail'

export default function MediaInfo() {
  const [isExtended, setIsExtended] = useState(false)

  const params = useParams<Record<'movieId' | 'tvId', string>>()
  const mediaId = Number(params.movieId || params.tvId)
  const mediaType: MediaType = params.movieId ? 'movie' : 'tv'

  return (
    <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_220px] lg:gap-8">
      {mediaType === 'movie' ? <MovieCastList isExtended={isExtended} setIsExtended={setIsExtended} /> : null}
      {mediaType === 'movie' ? <MovieInformation isSticky={isExtended} movieId={mediaId} /> : null}
      {mediaType === 'tv' ? <TvCastList isExtended={isExtended} setIsExtended={setIsExtended} /> : null}
      {mediaType === 'tv' ? <TvInformation isSticky={isExtended} tvId={mediaId} /> : null}
    </div>
  )
}

function MovieInformation({ isSticky, movieId }: { isSticky: boolean; movieId: number }) {
  const { isLoading, data: movieData, isSuccess } = useGetMovieDetailQuery(movieId)

  if (isLoading)
    return (
      <section className="hidden lg:block">
        <Skeleton className="h-8 w-2/3" />
        {Array.from({ length: 5 }).map((_, index) => (
          <Skeleton key={index} className="mt-3 h-5 w-1/2" />
        ))}
      </section>
    )

  return isSuccess ? (
    <section className={cn('hidden lg:block', { 'sticky top-0 -mt-10 h-fit pt-10 pb-9': isSticky })}>
      <Heading>Infomation</Heading>
      <div className="mt-6">
        <h4 className="font-semibold">Original title</h4>
        <h3 className="mt-0.5">{movieData.data.originalTitle}</h3>
      </div>
      <div className="mt-3">
        <h4 className="font-semibold">Original country</h4>
        <div className="mt-0.5 flex items-center gap-3">
          {movieData.data.originCountry.map((countryCode) => (
            <img
              key={countryCode}
              src={`https://flagcdn.com/48x36/${countryCode.toLowerCase()}.png`}
              className="h-6 object-contain"
            />
          ))}
        </div>
      </div>
      {MOVIE_DETAIL_INFO.map(({ key, title }) => (
        <DetailInfo
          key={key}
          title={title}
          data={key === 'budget' || key === 'revenue' ? currencyFormatter(movieData.data[key]) : movieData.data[key]}
        />
      ))}
    </section>
  ) : null
}

function TvInformation({ isSticky, tvId }: { isSticky: boolean; tvId: number }) {
  const { isLoading, data: movieData, isSuccess } = useGetTvDetailQuery(tvId)

  if (isLoading)
    return (
      <section className="hidden lg:block">
        <Skeleton className="h-8 w-2/3" />
        {Array.from({ length: 5 }).map((_, index) => (
          <Skeleton key={index} className="mt-3 h-5 w-1/2" />
        ))}
      </section>
    )

  return isSuccess ? (
    <section className={cn('hidden lg:block', { 'sticky top-0 -mt-10 h-fit pt-10 pb-9': isSticky })}>
      <Heading>Infomation</Heading>
      <div className="mt-6">
        <h4 className="font-semibold">Original name</h4>
        <h3 className="mt-0.5">{movieData.data.originalName}</h3>
      </div>
      <div className="mt-3">
        <h4 className="font-semibold">Original country</h4>
        <div className="mt-0.5 flex items-center gap-3">
          {movieData.data.originCountry.map((countryCode) => (
            <img
              key={countryCode}
              src={`https://flagcdn.com/48x36/${countryCode.toLowerCase()}.png`}
              className="h-6 object-contain"
            />
          ))}
        </div>
      </div>
      <div className="mt-3">
        <h4 className="font-semibold">Original Status</h4>
        <h3 className="mt-0.5">{movieData.data.status}</h3>
      </div>
      <div className="mt-3">
        <h4 className="font-semibold">Network</h4>
        <div className="mt-0.5 flex items-center gap-3">
          {movieData.data.networks.map((network) => (
            <img
              key={network.id}
              src={`https://media.themoviedb.org/t/p/h30${network.logoPath}`}
              className="h-6 object-contain invert"
            />
          ))}
        </div>
      </div>
    </section>
  ) : null
}

function DetailInfo({ title, data }: { title: string; data: string | number }) {
  return (
    <div className="mt-3">
      <h4 className="font-semibold">{title}</h4>
      <h3 className="mt-0.5">{data}</h3>
    </div>
  )
}
