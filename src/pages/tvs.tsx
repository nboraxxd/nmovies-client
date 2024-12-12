import { useRef } from 'react'
import useHeadingOffsetTop from '@/hooks/use-get-heading-offset-top'
import { GenresTvSelect, RatingSelect, SortBySelect, TvList } from '@/components/medias'

export default function TvsPage() {
  const headingRef = useRef<HTMLHeadingElement>(null)
  const headingOffsetTop = useHeadingOffsetTop(headingRef)

  return (
    <main className="container mt-10 sm:px-6 lg:px-8">
      <h1 ref={headingRef} className="text-xl font-bold text-foreground md:text-2xl lg:text-3xl">
        TV Shows
      </h1>
      <GenresTvSelect />
      <div className="mt-3 flex justify-end gap-3">
        <RatingSelect />
        <SortBySelect />
      </div>
      <TvList headingOffsetTop={headingOffsetTop} />
    </main>
  )
}
