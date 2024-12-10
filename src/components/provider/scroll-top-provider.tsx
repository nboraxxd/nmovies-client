import { useLayoutEffect } from 'react'
import { useLocation } from 'react-router-dom'

export default function ScrollTopProvider({ children }: { children: React.ReactNode }) {
  const { pathname } = useLocation()

  useLayoutEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
    })
  }, [pathname])

  return children
}
