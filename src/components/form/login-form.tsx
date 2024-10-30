import { z } from 'zod'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { LoaderCircleIcon } from 'lucide-react'
import { zodResolver } from '@hookform/resolvers/zod'

import { EntityError } from '@/types/error'
import { isEntityError } from '@/utils/error'
import { useAuthStore } from '@/lib/stores/auth-store'
import { useLogin } from '@/lib/tanstack-query/use-auth'
import { loginBodySchema, LoginBodyType } from '@/lib/schemas/auth.schema'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'

export default function LoginForm() {
  const form = useForm<LoginBodyType>({
    resolver: zodResolver(loginBodySchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const loginMutation = useLogin()
  const setIsAuth = useAuthStore((state) => state.setIsAuth)

  async function onValid(values: LoginBodyType) {
    if (loginMutation.isPending) return

    try {
      await loginMutation.mutateAsync(values)

      setIsAuth(true)
    } catch (error) {
      if (isEntityError<EntityError>(error)) {
        const formErrors = error.response?.data
        if (formErrors) {
          formErrors.errors.forEach(({ path, message }) => {
            form.setError(path as keyof LoginBodyType, { message, type: z.ZodIssueCode.custom })
          })
        }
      }
    }
  }

  return (
    <Form {...form}>
      <form className="w-full space-y-6" noValidate onSubmit={form.handleSubmit(onValid)}>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input {...field} placeholder="brucewayne@wayne-ent.dc" type="email" autoComplete="email" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <div className="flex justify-between">
                <FormLabel>Password</FormLabel>
                <Button variant="link" size="sm" className="h-auto p-0" asChild>
                  <Link to="/">Forgot password?</Link>
                </Button>
              </div>
              <FormControl>
                <Input {...field} placeholder="*********" type="password" autoComplete="current-password" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full gap-1.5" disabled={loginMutation.status === 'pending'}>
          {loginMutation.status === 'pending' ? <LoaderCircleIcon className="size-4 animate-spin" /> : null}
          Login
        </Button>
      </form>
    </Form>
  )
}
