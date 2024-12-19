import { useEffect, useRef } from 'react'
import { useInView } from 'framer-motion'
import { LoaderCircleIcon } from 'lucide-react'

interface Props {
  fetchNextPage: () => void
  hasNextPage: boolean
  isFetchingNextPage: boolean
}

export default function LoadMoreIndicator({ fetchNextPage, hasNextPage, isFetchingNextPage }: Props) {
  const ref = useRef<HTMLDivElement | null>(null)

  const isInView = useInView(ref, { margin: '400px' })
  useEffect(() => {
    if (isInView && hasNextPage) {
      fetchNextPage()
    }
  }, [fetchNextPage, hasNextPage, isInView])

  return (
    <div ref={ref} className="flex justify-center">
      {isFetchingNextPage ? <LoaderCircleIcon className="mt-3 size-6 animate-spin" /> : null}
    </div>
  )
}
