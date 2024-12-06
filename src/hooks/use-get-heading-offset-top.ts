import { RefObject, useEffect, useState } from 'react'

export default function useHeadingOffsetTop(ref: RefObject<HTMLHeadingElement>) {
  const [headingOffsetTop, setHeadingOffsetTop] = useState(0)

  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect()
      setHeadingOffsetTop(rect.top + window.scrollY)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return headingOffsetTop
}
