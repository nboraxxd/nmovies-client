import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { LoaderCircleIcon } from 'lucide-react'
import { zodResolver } from '@hookform/resolvers/zod'

import { EntityError } from '@/types/error'
import { isEntityError } from '@/utils/error'
import { useRegister } from '@/lib/tanstack-query/use-auth'
import { registerBodySchema, RegisterBodyType } from '@/lib/schemas/auth.schema'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'

export default function RegisterForm() {
  const form = useForm<RegisterBodyType>({
    resolver: zodResolver(registerBodySchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  })

  const registerMutation = useRegister()

  async function onValid(values: RegisterBodyType) {
    if (registerMutation.isPending) return

    try {
      await registerMutation.mutateAsync(values)
    } catch (error) {
      if (isEntityError<EntityError>(error)) {
        const formErrors = error.response?.data
        if (formErrors) {
          formErrors.errors.forEach(({ path, message }) => {
            form.setError(path as keyof RegisterBodyType, { message, type: z.ZodIssueCode.custom })
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
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Bruce Wayne" type="text" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
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
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input {...field} placeholder="*********" type="password" autoComplete="new-password" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <Input {...field} placeholder="*********" type="password" autoComplete="new-password" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full gap-1.5" disabled={registerMutation.status === 'pending'}>
          {registerMutation.status === 'pending' ? <LoaderCircleIcon className="size-4 animate-spin" /> : null}
          Register
        </Button>
      </form>
    </Form>
  )
}
