import { useCallback, useLayoutEffect, useState } from 'react'

interface ScrollState {
  x: number | null
  y: number | null
}

export default function useWindowScroll(): [ScrollState, (options: ScrollToOptions) => void] {
  const [state, setState] = useState<ScrollState>({
    x: null,
    y: null,
  })

  const scrollTo = useCallback((args: ScrollToOptions) => {
    window.scrollTo(args)
  }, [])

  useLayoutEffect(() => {
    const handleScroll = () => {
      setState({ x: window.scrollX, y: window.scrollY })
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return [state, scrollTo]
}
