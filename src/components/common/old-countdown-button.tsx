import { LoaderCircleIcon } from 'lucide-react'
import { ComponentProps, ReactNode, useEffect, useState, useRef } from 'react'
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

  // Track the end time for accurate countdown
  const endTimeRef = useRef<number | null>(null)
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  // Initialize or reset countdown
  useEffect(() => {
    if (enableCountdown) {
      setIsWaiting(true)
      setCountdown(timer)
      // Set the end time when countdown is enabled
      endTimeRef.current = Date.now() + timer * 1000
    }
  }, [timer, enableCountdown])

  // Handle the actual countdown
  useEffect(() => {
    // Clear any existing timer
    if (timerRef.current) {
      clearInterval(timerRef.current)
      timerRef.current = null
    }

    if (isWaiting && endTimeRef.current) {
      // Create a new interval that calculates remaining time based on the end time
      timerRef.current = setInterval(() => {
        const now = Date.now()
        const remaining = Math.max(0, Math.ceil((endTimeRef.current! - now) / 1000))

        setCountdown(remaining)

        if (remaining <= 0) {
          // Countdown complete
          clearInterval(timerRef.current!)
          timerRef.current = null
          setIsWaiting(false)
          endTimeRef.current = null
        }
      }, 1000)
    }

    // Cleanup on unmount
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
    }
  }, [isWaiting])

  // Handle visibility changes (switching apps or turning off screen)
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        // When coming back to the app, recalculate the countdown based on the end time
        if (isWaiting && endTimeRef.current) {
          const now = Date.now()
          const remaining = Math.max(0, Math.ceil((endTimeRef.current - now) / 1000))

          setCountdown(remaining)

          if (remaining <= 0) {
            // Countdown completed while app was not visible
            setIsWaiting(false)
            endTimeRef.current = null
          }
        }
      }
    }

    // Add event listener for visibility changes
    document.addEventListener('visibilitychange', handleVisibilityChange)

    // Clean up
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [isWaiting])

  return (
    <Button className={cn('gap-1.5', className)} disabled={disabled || isLoading || isWaiting} {...rest}>
      {isLoading ? <LoaderCircleIcon className="size-4 animate-spin" /> : null}
      {children} {isWaiting ? `in ${formatSecondsToMMSS(countdown)}` : ''}
    </Button>
  )
}
