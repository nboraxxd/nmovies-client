import { LoaderCircleIcon } from 'lucide-react'
import { ComponentProps, ReactNode, useEffect, useState, useRef, useCallback } from 'react'
import { cn, formatSecondsToMMSS } from '@/utils'
import { Button } from '@/components/ui/button'

interface Props extends ComponentProps<'button'> {
  children: ReactNode
  timer: number
  enableCountdown?: boolean
  className?: string
  isLoading?: boolean
}

export default function CountdownButton(props: Props) {
  const { children, timer, enableCountdown, className, isLoading, disabled, ...rest } = props

  const [isWaiting, setIsWaiting] = useState(Boolean(enableCountdown))
  const [countdown, setCountdown] = useState(timer)

  // Refs
  const endTimeRef = useRef<number | null>(null)
  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const textNodeRef = useRef<Text | null>(null)
  const childTextRef = useRef<string>('')

  // Update DOM directly to prevent flicker
  const updateTextNodeDirectly = (seconds: number) => {
    if (buttonRef.current && textNodeRef.current) {
      textNodeRef.current.nodeValue = `${childTextRef.current} in ${formatSecondsToMMSS(seconds)}`
    }
  }

  // Function to calculate and update countdown
  const updateCountdown = useCallback(() => {
    if (!endTimeRef.current) return false

    const now = Date.now()
    const remaining = Math.max(0, Math.ceil((endTimeRef.current - now) / 1000))

    // Update DOM directly first (no React re-render)
    updateTextNodeDirectly(remaining)

    // Then update React state (will be visible on next render)
    setCountdown(remaining)

    if (remaining <= 0) {
      endTimeRef.current = null
      setIsWaiting(false)
      return false
    }

    return true
  }, [])

  // Initialize countdown
  useEffect(() => {
    if (enableCountdown) {
      setIsWaiting(true)
      setCountdown(timer)
      endTimeRef.current = Date.now() + timer * 1000
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current)
        timerRef.current = null
      }
      endTimeRef.current = null
      setIsWaiting(false)
    }
  }, [timer, enableCountdown])

  // Handle countdowns
  useEffect(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current)
      timerRef.current = null
    }

    if (isWaiting && endTimeRef.current) {
      // Calculate immediately
      updateCountdown()

      timerRef.current = setInterval(() => {
        const shouldContinue = updateCountdown()
        if (!shouldContinue && timerRef.current) {
          clearInterval(timerRef.current)
          timerRef.current = null
        }
      }, 1000)
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
        timerRef.current = null
      }
    }
  }, [isWaiting, updateCountdown])

  // Handle visibility changes (app switching, screen off)
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        if (isWaiting && endTimeRef.current) {
          // This will update the DOM directly before any React renders
          updateCountdown()
        }
      }
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [isWaiting, updateCountdown])

  // Store child text for direct DOM manipulation
  useEffect(() => {
    if (typeof children === 'string') {
      childTextRef.current = children
    } else if (Array.isArray(children) && children.length > 0 && typeof children[0] === 'string') {
      childTextRef.current = children[0]
    } else {
      childTextRef.current = ''
    }
  }, [children])

  // Reference the text node after render
  useEffect(() => {
    if (buttonRef.current && isWaiting) {
      // Find the text node to manipulate directly
      const findTextNode = (node: Node): Text | null => {
        if (node.nodeType === Node.TEXT_NODE) {
          return node as Text
        }

        for (let i = 0; i < node.childNodes.length; i++) {
          const found = findTextNode(node.childNodes[i])
          if (found) return found
        }

        return null
      }

      textNodeRef.current = findTextNode(buttonRef.current)

      // Initial direct update
      if (endTimeRef.current) {
        updateCountdown()
      }
    }
  }, [isWaiting, updateCountdown])

  // Handle browser page show event (more reliable for mobile)
  useEffect(() => {
    const handlePageShow = () => {
      if (isWaiting && endTimeRef.current) {
        updateCountdown()
      }
    }

    window.addEventListener('pageshow', handlePageShow)

    return () => {
      window.removeEventListener('pageshow', handlePageShow)
    }
  }, [isWaiting, updateCountdown])

  return (
    <Button
      ref={buttonRef}
      className={cn('gap-1.5', className)}
      disabled={disabled || isLoading || isWaiting}
      {...rest}
    >
      {isLoading ? <LoaderCircleIcon className="size-4 animate-spin" /> : null}
      {isWaiting ? `${children} in ${formatSecondsToMMSS(countdown)}` : children}
    </Button>
  )
}
