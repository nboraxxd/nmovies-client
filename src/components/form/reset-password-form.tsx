import { z } from 'zod'
import { toast } from 'sonner'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { LoaderCircleIcon } from 'lucide-react'
import { zodResolver } from '@hookform/resolvers/zod'

import { PATH } from '@/constants/path'
import { EntityError } from '@/types/error'
import { isAxiosEntityError } from '@/utils/error'
import { useResetPasswordMutation } from '@/lib/tanstack-query/use-auth'
import { resetPasswordBodySchema, ResetPasswordBodyType } from '@/lib/schemas/auth.schema'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'

export default function ResetPasswordForm({ resetPasswordToken }: { resetPasswordToken: string }) {
  const navigate = useNavigate()

  const form = useForm<ResetPasswordBodyType>({
    resolver: zodResolver(resetPasswordBodySchema),
    defaultValues: {
      resetPasswordToken,
      password: '',
      confirmPassword: '',
    },
  })

  const resetPasswordMutation = useResetPasswordMutation()

  async function onValid(values: ResetPasswordBodyType) {
    if (resetPasswordMutation.isPending) return

    try {
      const response = await resetPasswordMutation.mutateAsync(values)

      toast.success(response.message)
      navigate(PATH.LOGIN)
      form.reset()
    } catch (error) {
      if (isAxiosEntityError<EntityError>(error)) {
        const formErrors = error.response?.data
        if (formErrors) {
          formErrors.errors.forEach(({ path, message }) => {
            form.setError(path as keyof ResetPasswordBodyType, { message, type: z.ZodIssueCode.custom })
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
        <Button type="submit" className="w-full gap-1.5" disabled={resetPasswordMutation.isPending}>
          {resetPasswordMutation.isPending ? <LoaderCircleIcon className="size-4 animate-spin" /> : null}
          Reset Password
        </Button>
      </form>
    </Form>
  )
}
