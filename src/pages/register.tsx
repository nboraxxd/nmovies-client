import { Link, useLocation } from 'react-router-dom'

import { cn } from '@/utils'
import { PATH } from '@/constants/path'
import { RegisterForm } from '@/components/form'
import { buttonVariants } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'

export default function RegisterPage() {
  const { search } = useLocation()

  return (
    <div className="flex min-h-[calc(100vh-var(--header-height))] items-center justify-center">
      <Card className="max-w-sm grow">
        <CardHeader>
          <CardTitle className="text-2xl">Create an account 🎉</CardTitle>
          <CardDescription>Start your journey with us today 🚀</CardDescription>
        </CardHeader>
        <CardContent>
          <RegisterForm />
        </CardContent>
        <CardFooter className="flex items-center justify-center gap-1.5">
          <span>Already have an account?</span>
          <Link to={`${PATH.LOGIN}${search}`} className={cn(buttonVariants({ variant: 'link', size: 'none' }))}>
            Login here
          </Link>
        </CardFooter>
      </Card>
    </div>
  )
}
