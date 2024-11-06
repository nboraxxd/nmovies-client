import { cn, currencyFormatter } from '@/utils'
import { Heading } from '@/components/common'
import { useGetMovieDetailQuery } from '@/lib/tanstack-query/use-movies'

interface Props {
  isSticky: boolean
  movieId: number
}

export default function MovieInformation({ isSticky, movieId }: Props) {
  const { isLoading, data: movieData, isSuccess } = useGetMovieDetailQuery(movieId)
  console.log('🔥 ~ MovieInformation ~ movieData:', movieData)

  if (isLoading) return <section className="hidden lg:block"></section>

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
      <div className="mt-3">
        <h4 className="font-semibold">Status</h4>
        <h3 className="mt-0.5">{movieData.data.status}</h3>
      </div>
      <div className="mt-3">
        <h4 className="font-semibold">Budget</h4>
        <h3 className="mt-0.5">{currencyFormatter(movieData.data.budget)}</h3>
      </div>
      <div className="mt-3">
        <h4 className="font-semibold">Revenue</h4>
        <h3 className="mt-0.5">{currencyFormatter(movieData.data.revenue)}</h3>
      </div>
    </section>
  ) : null
}
