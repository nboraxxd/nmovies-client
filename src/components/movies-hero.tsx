import { PlayIcon } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useMediaQuery } from 'usehooks-ts'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination } from 'swiper/modules'

import { PATH } from '@/constants/path'
import { useGetDiscoverMoviesQuery } from '@/lib/tanstack-query/use-movies'

import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { ImageWithLoading } from '@/components/common'
import placeholderBackdrop from '/placeholder-backdrop.svg'
import 'swiper/css'
import 'swiper/css/pagination'

export default function MoviesHero() {
  const isMdScreen = useMediaQuery('(min-width: 768px)')
  const getDiscoverQuery = useGetDiscoverMoviesQuery()

  if (getDiscoverQuery.isLoading)
    return (
      <div className="relative aspect-video rounded-none bg-muted/30 xl:h-[calc(100vh-var(--header-height))] xl:w-full">
        <div className="absolute top-1/2 flex w-full max-w-[90vw] -translate-y-1/2 flex-col gap-5 pl-8 text-popover md:max-w-[50vw] md:gap-8 md:pl-16">
          <Skeleton className="h-8 w-1/2 md:h-10" />
          <Skeleton className="hidden h-6 w-1/3 md:block" />
          <div className="flex flex-col gap-1 md:gap-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className="h-5 w-full md:h-6" />
            ))}
          </div>
          <div className="flex gap-2">
            <Skeleton className="h-10 w-1/6" />
            <Skeleton className="h-10 w-1/6" />
          </div>
        </div>
      </div>
    )

  return getDiscoverQuery.isSuccess ? (
    <div>
      <Swiper
        className="mySwiper"
        loop={true}
        slidesPerView={1}
        autoplay={{
          delay: 15000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        pagination={{ clickable: true }}
        modules={isMdScreen ? [Autoplay, Pagination] : [Autoplay]}
      >
        {getDiscoverQuery.data.data.slice(0, 4).map((item) => (
          <SwiperSlide key={item.id} className="relative">
            <ImageWithLoading
              src={item.backdropPath || placeholderBackdrop}
              alt={item.title}
              width={1920}
              height={1080}
              className="aspect-video object-cover brightness-50 xl:h-[calc(100vh-var(--header-height))] xl:w-screen"
            />
            <div className="absolute top-1/2 flex max-w-[90vw] -translate-y-1/2 flex-col gap-3 pl-8 text-popover lg:max-w-[50vw] lg:gap-5 lg:pl-16">
              <h2 className="text-2xl md:text-4xl">{item.title}</h2>
              <p className="hidden md:block">{item.releaseDate}</p>
              <div>
                <p className="mb-2 hidden font-bold md:block">Overview</p>
                <p className="line-clamp-3 leading-relaxed md:line-clamp-5">{item.overview}</p>
              </div>
              <div className="flex gap-2">
                <Button variant="secondary">
                  <PlayIcon className="mr-1 size-4" />
                  Trailer
                </Button>
                <Button asChild variant="outline">
                  <Link to={`${PATH.MOVIES}/${item.id}`}>View Detail</Link>
                </Button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  ) : null
}
