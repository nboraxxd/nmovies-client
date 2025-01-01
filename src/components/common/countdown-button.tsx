import { LoaderCircleIcon } from 'lucide-react'
import { ComponentProps, ReactNode, useEffect, useState } from 'react'

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

  useEffect(() => {
    let timer: string | number | NodeJS.Timeout | undefined
    if (isWaiting) {
      timer = setInterval(() => {
        setCountdown((prevCountdown) => {
          const remainingSeconds = prevCountdown - 1
          if (remainingSeconds <= 0) {
            clearInterval(timer) // Stop the countdown when it reaches 0
            setIsWaiting(false)
          }

          return remainingSeconds
        })
      }, 1000)
    }

    return () => clearInterval(timer) // Cleanup timer when the component unmounts
  }, [isWaiting])

  useEffect(() => {
    if (enableCountdown) {
      setIsWaiting(true)
      setCountdown(timer)
    }
  }, [timer, enableCountdown])

  return (
    <Button className={cn('gap-1.5', className)} disabled={disabled || isLoading || isWaiting} {...rest}>
      {isLoading ? <LoaderCircleIcon className="size-4 animate-spin" /> : null}
      {children} {isWaiting ? `in ${formatSecondsToMMSS(countdown)}` : ''}
    </Button>
  )
}
