import { useEffect } from 'react'
import { PATH } from '@/constants/path'
import { useNavigate, useSearchParams } from 'react-router-dom'

import { ResetPasswordForm } from '@/components/form'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function ResetPasswordPage() {
  const navigate = useNavigate()

  const [searchParams] = useSearchParams()
  const resetPasswordToken = searchParams.get('token')

  useEffect(() => {
    if (!resetPasswordToken) {
      navigate(PATH.HOMEPAGE)
    }
  }, [navigate, resetPasswordToken])

  return (
    <div className="flex min-h-[calc(100vh-var(--header-height))] items-center justify-center">
      {resetPasswordToken ? (
        <Card className="max-w-sm grow">
          <CardHeader>
            <CardTitle className="text-2xl">Forgot password?</CardTitle>
            <CardDescription>No worries, we'll send you reset instructions.</CardDescription>
          </CardHeader>
          <CardContent>
            <ResetPasswordForm resetPasswordToken={resetPasswordToken} />
          </CardContent>
        </Card>
      ) : null}
    </div>
  )
}
