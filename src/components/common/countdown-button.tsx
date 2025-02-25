import { LoaderCircleIcon } from 'lucide-react'
import { ComponentProps, ReactNode, useEffect, useState, useRef, useLayoutEffect } from 'react'

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

  // Refs for tracking time and intervals
  const endTimeRef = useRef<number | null>(null)
  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const isMountedRef = useRef(true)

  // Function to update countdown based on end time
  const updateCountdownFromEndTime = () => {
    if (!endTimeRef.current) return false

    const now = Date.now()
    const remaining = Math.max(0, Math.ceil((endTimeRef.current - now) / 1000))

    setCountdown(remaining)

    if (remaining <= 0) {
      endTimeRef.current = null
      setIsWaiting(false)
      return false
    }

    return true
  }

  // Initialize countdown when enableCountdown changes
  useEffect(() => {
    if (enableCountdown) {
      setIsWaiting(true)
      setCountdown(timer)
      endTimeRef.current = Date.now() + timer * 1000
    } else {
      // Handle explicit disabling of countdown
      if (timerRef.current) {
        clearInterval(timerRef.current)
        timerRef.current = null
      }
      endTimeRef.current = null
      setIsWaiting(false)
    }
  }, [timer, enableCountdown])

  // Handle the countdown timer
  useEffect(() => {
    // Clear existing interval
    if (timerRef.current) {
      clearInterval(timerRef.current)
      timerRef.current = null
    }

    // Start new interval if waiting
    if (isWaiting && endTimeRef.current) {
      // Immediately update to correct time before starting interval
      updateCountdownFromEndTime()

      timerRef.current = setInterval(() => {
        const shouldContinue = updateCountdownFromEndTime()

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
  }, [isWaiting])

  // Handle visibility changes
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        // Important: Update immediately when becoming visible
        if (isWaiting && endTimeRef.current) {
          // We update immediately without waiting for re-render
          requestAnimationFrame(() => {
            if (isMountedRef.current) {
              updateCountdownFromEndTime()
            }
          })
        }
      }
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [isWaiting])

  // Set mounted status for cleanup
  useEffect(() => {
    isMountedRef.current = true
    return () => {
      isMountedRef.current = false
    }
  }, [])

  // Use layoutEffect to ensure countdown is correct before paint
  useLayoutEffect(() => {
    if (isWaiting && endTimeRef.current) {
      updateCountdownFromEndTime()
    }
  }, [isWaiting])

  return (
    <Button className={cn('gap-1.5', className)} disabled={disabled || isLoading || isWaiting} {...rest}>
      {isLoading ? <LoaderCircleIcon className="size-4 animate-spin" /> : null}
      {children} {isWaiting ? `in ${formatSecondsToMMSS(countdown)}` : ''}
    </Button>
  )
}
