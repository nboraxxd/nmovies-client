import { Link, useLocation } from 'react-router-dom'

import { cn } from '@/utils'
import { PATH } from '@/constants/path'
import { LoginForm } from '@/components/form'
import { buttonVariants } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'

export default function LoginPage() {
  const { search } = useLocation()

  return (
    <div className="flex min-h-[calc(100vh-var(--header-height))] items-center justify-center">
      <Card className="max-w-sm grow">
        <CardHeader>
          <CardTitle className="text-2xl">Welcome back!</CardTitle>
          <CardDescription>Please login to your account to continue.</CardDescription>
        </CardHeader>
        <CardContent>
          <LoginForm />
        </CardContent>
        <CardFooter className="flex items-center justify-center gap-1.5">
          <span>Don&apos;t have an account?</span>
          <Link to={`${PATH.REGISTER}${search}`} className={cn(buttonVariants({ variant: 'link', size: 'none' }))}>
            Register here
          </Link>
        </CardFooter>
      </Card>
    </div>
  )
}
