import { toast } from 'sonner'
import { useEffect, useRef } from 'react'
import { LoaderCircleIcon } from 'lucide-react'
import { useNavigate, useSearchParams } from 'react-router-dom'

import { PATH } from '@/constants/path'
import { UnauthorizedError } from '@/types/error'
import { isAxiosUnauthorizedError } from '@/utils/error'
import { useVerifyEmail } from '@/lib/tanstack-query/use-auth'

export default function VerifyEmailPage() {
  const verifyEmailRef = useRef<unknown>(null)

  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const emailVerifyToken = searchParams.get('token')

  const { mutateAsync, isPending } = useVerifyEmail()

  useEffect(() => {
    let timeout: NodeJS.Timeout | null = null

    if (emailVerifyToken) {
      if (verifyEmailRef.current) return
      ;(async () => {
        verifyEmailRef.current = mutateAsync

        try {
          const response = await mutateAsync({ emailVerifyToken })

          toast.success(response.message)
          navigate(PATH.HOMEPAGE)
        } catch (error) {
          if (isAxiosUnauthorizedError<UnauthorizedError>(error)) {
            toast.error(
              error.response?.data.message === 'Jwt expired'
                ? 'Email verification link has expired.'
                : error.response?.data.message
            )
          }
        }

        timeout = setTimeout(() => {
          verifyEmailRef.current = null
        }, 1000)
      })()
    } else {
      navigate(PATH.HOMEPAGE)
    }

    return () => {
      if (timeout) clearTimeout(timeout)
    }
  }, [emailVerifyToken, mutateAsync, navigate])

  return emailVerifyToken && isPending ? (
    <div className="flex h-screen flex-col items-center justify-center">
      <p className="flex items-center gap-x-3">
        <LoaderCircleIcon className="size-8 animate-spin" />
        <span className="font-medium text-foreground">Verifying email...</span>
      </p>
    </div>
  ) : null
}
