import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'

export default function useIsTyping(delay: number = 500) {
  const [searchParams] = useSearchParams()
  const [isTyping, setIsTyping] = useState(false)

  useEffect(() => {
    const handleTyping = setTimeout(() => {
      setIsTyping(false)
    }, delay)

    setIsTyping(true)

    return () => clearTimeout(handleTyping)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams.toString(), delay])

  return isTyping
}
