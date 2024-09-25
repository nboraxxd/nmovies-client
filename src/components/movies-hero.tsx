import { PlayIcon } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useMediaQuery } from 'usehooks-ts'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination } from 'swiper/modules'

import { useGetDiscoverQuery } from '@/lib/tanstack-query/use-discover'
import { Button } from '@/components/ui/button'
import 'swiper/css'
import 'swiper/css/pagination'

export default function MoviesHero() {
  const isMdScreen = useMediaQuery('(min-width: 768px)')
  const getDiscoverQuery = useGetDiscoverQuery({ mediaType: 'movie' }, { page: 1, sortBy: 'popularity.desc' })

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
            src={`https://image.tmdb.org/t/p/original${item.backdrop_path}`}
            alt={item.title}
            className="aspect-video object-cover brightness-50 xl:h-[calc(100vh-var(--header-height))] xl:w-screen"
          />
          <div className="absolute top-1/2 flex max-w-[90vw] -translate-y-1/2 flex-col gap-3 pl-8 text-popover md:max-w-[420px] md:gap-5 md:pl-16">
            <h2 className="line-clamp-1 text-4xl sm:max-w-[420px]">{item.title}</h2>
            <p className="hidden md:block">{item.release_date}</p>
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
                <Link to="/movie/1">View Detail</Link>
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
