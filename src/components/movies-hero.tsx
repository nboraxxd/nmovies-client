import { PlayIcon } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useMediaQuery } from 'usehooks-ts'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination } from 'swiper/modules'

import { PATH } from '@/constants/path'
import { Button } from '@/components/ui/button'
import placeholderBackdrop from '/placeholder-backdrop.svg'
import 'swiper/css'
import 'swiper/css/pagination'
import { useGetDiscoverMoviesQuery } from '@/lib/tanstack-query/use-movies'

export default function MoviesHero() {
  const isMdScreen = useMediaQuery('(min-width: 768px)')
  const getDiscoverQuery = useGetDiscoverMoviesQuery()

  return getDiscoverQuery.isSuccess ? (
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
          <img
            src={item.backdropPath || placeholderBackdrop}
            alt={item.title}
            className="aspect-video object-cover brightness-50 xl:h-[calc(100vh-var(--header-height))] xl:w-screen"
          />
          <div className="absolute top-1/2 flex max-w-[90vw] -translate-y-1/2 flex-col gap-3 pl-8 text-popover md:max-w-[50vw] md:gap-5 md:pl-16">
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
  ) : (
    <div className="aspect-video bg-slate-300 object-cover brightness-50 xl:h-[calc(100vh-var(--header-height))] xl:w-full"></div>
  )
}
