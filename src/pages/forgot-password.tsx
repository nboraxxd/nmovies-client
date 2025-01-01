import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpLeftIcon } from 'lucide-react'

import { cn } from '@/utils'
import { PATH } from '@/constants/path'
import envVariables from '@/lib/schemas/env-variables.schema'
import { useForgotPasswordMutation } from '@/lib/tanstack-query/use-auth'

import { CountdownButton } from '@/components/common'
import { ForgotPasswordForm } from '@/components/form'
import { buttonVariants } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'

export default function ForgotPasswordPage() {
  const [isFirstSubmited, setIsFirstSubmited] = useState(false)
  const [enableCountdown, setEnableCountdown] = useState(false)

  const { isPending, isSuccess, mutateAsync, variables } = useForgotPasswordMutation()

  async function handleResendEmail() {
    setEnableCountdown(false)

    if (!variables?.email) return

    await mutateAsync({ email: variables.email, clientUrl: envVariables.VITE_CLIENT_URL })

    setEnableCountdown(true)
  }

  if (isFirstSubmited || isSuccess) {
    return (
      <div className="flex min-h-[calc(100vh-var(--header-height))] items-center justify-center">
        <Card className="max-w-sm grow">
          <CardHeader>
            <CardTitle className="text-2xl">Check your email</CardTitle>
            <CardDescription>We sent a password reset link to your email.</CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <CountdownButton
              timer={envVariables.VITE_RESEND_EMAIL_DEBOUNCE_TIME}
              className="w-full"
              onClick={handleResendEmail}
              disabled={!variables?.email}
              isLoading={isPending}
              enableCountdown={enableCountdown}
            >
              Resend email
            </CountdownButton>
          </CardContent>
          <CardFooter className="flex items-center justify-center gap-1.5">
            <Link
              to={`${PATH.LOGIN}`}
              className={cn(buttonVariants({ variant: 'link', size: 'none' }), 'text-foreground')}
            >
              <ArrowUpLeftIcon className="size-4" />
              Back to login
            </Link>
          </CardFooter>
        </Card>
      </div>
    )
  }

  return (
    <div className="flex min-h-[calc(100vh-var(--header-height))] items-center justify-center">
      <Card className="max-w-sm grow">
        <CardHeader>
          <CardTitle className="text-2xl">Forgot password?</CardTitle>
          <CardDescription>No worries, we'll send you reset instructions.</CardDescription>
        </CardHeader>
        <CardContent>
          <ForgotPasswordForm
            isPending={isPending}
            mutateAsync={mutateAsync}
            setEnableCountdown={setEnableCountdown}
            setIsFirstSubmited={setIsFirstSubmited}
          />
        </CardContent>
        <CardFooter className="flex items-center justify-center gap-1.5">
          <Link
            to={`${PATH.LOGIN}`}
            className={cn(buttonVariants({ variant: 'link', size: 'none' }), 'text-foreground')}
          >
            <ArrowUpLeftIcon className="size-4" />
            Back to login
          </Link>
        </CardFooter>
      </Card>
    </div>
  )
}
