import { PlayIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { CircularProgressBar } from '@/components/icons'
import { useParams } from 'react-router-dom'

export default function MovieDetail() {
  const { movieId } = useParams<{ movieId: string }>()

  return (
    <main>
      <div className="relative">
        {/* Backdrop */}
        <div className="relative pb-[100%] sm:pb-[72%] md:pb-[56%] lg:pb-[42%] xl:pb-[36%]">
          <img
            src="https://image.tmdb.org/t/p/original/zAqBIeO71BFL7bAtP5TFzVjVamy.jpg"
            alt=""
            className="absolute inset-0 size-full object-cover brightness-[0.2]"
          />
        </div>
        {/* Infomation */}
        <div className="absolute inset-0 mx-auto flex max-w-screen-xl items-center justify-center gap-8 p-6 md:items-stretch lg:p-8">
          {/* Poster */}
          <div className="hidden shrink-0 md:block">
            <img
              src="https://image.tmdb.org/t/p/w600_and_h900_bestv2/cSMdFWmajaX4oUMLx7HEDI84GkP.jpg"
              alt=""
              className="size-full rounded-lg object-contain shadow-lg"
            />
          </div>
          {/* Content */}
          <div className="md:max-w-xl">
            <h1 className="line-clamp-1 text-xl font-bold text-foreground md:text-2xl lg:text-3xl">
              Lorem ipsum dolor sit amet consectetur.
            </h1>

            <div className="mt-4 flex items-center gap-4">
              <span className="shrink-0 border border-gray-400 p-1 text-gray-400">PG-13</span>
              <span className="shrink-0">2024-11-11</span>
              <div className="hidden md:line-clamp-1">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Soluta, aut.
              </div>
            </div>

            <div className="mt-6 flex items-center gap-6">
              <CircularProgressBar percent={80} className="relative" />
              <Button variant="secondary">
                <PlayIcon className="mr-1 size-4" />
                Trailer
              </Button>
            </div>

            <div className="mt-6 space-y-1.5 md:mt-8">
              <p className="font-semibold">Overview</p>
              <p className="line-clamp-3">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim, consequatur expedita. Libero odit
                excepturi vel similique velit laudantium asperiores labore! Numquam perferendis sint excepturi vitae?
              </p>
            </div>

            <div className="mt-6 hidden grid-cols-2 gap-2 text-sm sm:grid">
              <div className="space-y-1.5">
                <p className="font-semibold">Director</p>
                <p className="line-clamp-1">Lorem, ipsum dolor.</p>
              </div>
              <div className="space-y-1.5">
                <p className="font-semibold">Screenplay</p>
                <p className="line-clamp-1">Lorem ipsum dolor sit amet.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
