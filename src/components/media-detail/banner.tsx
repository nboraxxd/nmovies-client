import { PlayIcon } from 'lucide-react'

import { useAuthStore } from '@/lib/stores/auth-store'
import { GenreType } from '@/lib/schemas/common-media.schema'

import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { ImageWithLoading } from '@/components/common'
import { CircularProgressBar } from '@/components/icons'
import FavoriteButton from '@/components/media-detail/favorite-button'
import placeholderBackdrop from '/placeholder-backdrop.svg'
import placeholderPoster from '/placeholder-poster.svg'

interface Props {
  title: string
  releaseDate: string
  overview: string
  voteAverage: number
  directors: string[]
  screenplays: string[]
  writers: string[]
  genres: GenreType[]
  poster: string | null
  backdrop: string | null
  certification: string | null
}

function Banner(props: Props) {
  const {
    screenplays,
    directors,
    writers,
    genres,
    overview,
    releaseDate,
    title,
    voteAverage,
    backdrop,
    certification,
    poster,
  } = props

  const isAuth = useAuthStore((state) => state.isAuth)

  return (
    <div className="relative">
      {/* Backdrop */}
      <div className="relative pb-[100%] sm:pb-[72%] md:pb-[56%] lg:pb-[42%] xl:pb-[36%]">
        <ImageWithLoading
          width={1920}
          height={664}
          src={backdrop || placeholderBackdrop}
          alt={title}
          className="absolute inset-0 size-full object-cover brightness-[0.2]"
        />
      </div>
      {/* Infomation */}
      <div className="absolute inset-0 mx-auto flex max-w-screen-xl items-center justify-center gap-8 p-6 md:items-stretch lg:p-8">
        {/* Poster */}
        <div className="hidden shrink-0 md:block">
          <ImageWithLoading
            width={414}
            height={622}
            src={poster || placeholderPoster}
            alt={title}
            className="size-full rounded-lg object-contain shadow-lg"
          />
        </div>
        {/* Content */}
        <div className="grow md:max-w-xl">
          <h1 className="line-clamp-1 text-xl font-bold text-foreground md:text-2xl lg:text-3xl">{title}</h1>

          <div className="mt-4 flex items-center gap-4">
            {certification ? (
              <span className="shrink-0 border border-gray-400 px-1.5 py-1">{certification}</span>
            ) : null}
            <span className="shrink-0">{releaseDate}</span>
            <div className="hidden md:line-clamp-1">{genres.map((genre) => genre.name).join(', ')}</div>
          </div>

          <div className="mt-6 flex items-center gap-4">
            <CircularProgressBar percent={Math.round(voteAverage * 10)} className="relative" />
            <Button variant="secondary">
              <PlayIcon className="mr-1 size-4" />
              Trailer
            </Button>
            {isAuth ? <FavoriteButton mediaPoster={poster} mediaReleaseDate={releaseDate} mediaTitle={title} /> : null}
          </div>

          <div className="mt-6 space-y-1.5 md:mt-8">
            <p className="font-semibold">Overview</p>
            <p className="line-clamp-3">{overview}</p>
          </div>

          <div className="mt-6 hidden grid-cols-2 gap-2 text-sm sm:grid">
            <div className="space-y-1.5">
              {directors.length > 0 ? (
                <>
                  <p className="font-semibold">Director</p>
                  <p className="line-clamp-1">{directors.join(', ')}</p>
                </>
              ) : null}
            </div>
            <div className="space-y-1.5">
              {screenplays.length > 0 ? (
                <>
                  <p className="font-semibold">Screenplay</p>
                  <p className="line-clamp-1">{screenplays.join(', ')}</p>
                </>
              ) : writers.length > 0 ? (
                <>
                  <p className="font-semibold">Writer</p>
                  <p className="line-clamp-1">{writers.join(', ')}</p>
                </>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function BannerSkeleton() {
  return (
    <div className="relative w-full bg-muted/30 pb-[100%] sm:pb-[72%] md:pb-[56%] lg:pb-[42%] xl:pb-[36%]">
      <div className="absolute inset-0 mx-auto flex w-full max-w-screen-xl items-center justify-center gap-8 p-6 md:items-stretch lg:p-8">
        <Skeleton className="hidden h-full md:block md:w-[344px] lg:w-72 xl:w-96" />
        <div className="grow md:max-w-xl">
          <Skeleton className="h-8 w-2/3" />
          {Array.from({ length: 5 }).map((_, index) => (
            <Skeleton key={index} className="mt-3 h-5 w-1/2" />
          ))}
        </div>
      </div>
    </div>
  )
}

export { Banner, BannerSkeleton }
