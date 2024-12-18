import { z } from 'zod'
import { toast } from 'sonner'
import { useForm } from 'react-hook-form'
import { LoaderCircleIcon } from 'lucide-react'
import { zodResolver } from '@hookform/resolvers/zod'

import { EntityError } from '@/types/error'
import { isAxiosEntityError } from '@/utils/error'
import { useChangePassword } from '@/lib/tanstack-query/use-auth'
import { changePasswordBodySchema, ChangePasswordBodyType } from '@/lib/schemas/auth.schema'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'

export default function UpdateProfileForm() {
  const changePasswordMutation = useChangePassword()

  const form = useForm<ChangePasswordBodyType>({
    resolver: zodResolver(changePasswordBodySchema),
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmNewPassword: '',
    },
  })

  async function onValid(values: ChangePasswordBodyType) {
    if (changePasswordMutation.isPending) return

    try {
      const response = await changePasswordMutation.mutateAsync(values)

      toast.success(response.message)
      form.reset()
    } catch (error) {
      if (isAxiosEntityError<EntityError>(error)) {
        const formErrors = error.response?.data

        if (formErrors) {
          formErrors.errors.forEach(({ path, message }) => {
            form.setError(path as keyof ChangePasswordBodyType, { message, type: z.ZodIssueCode.custom })
          })
        }
      }
    }
  }

  return (
    <Form {...form}>
      <form className="w-full space-y-6" noValidate onSubmit={form.handleSubmit(onValid)}>
        {/* Current password */}
        <FormField
          control={form.control}
          name="currentPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  value={field.value ?? ''}
                  onChange={(ev) => {
                    field.onChange(ev.target.value !== '' ? ev.target.value : undefined)
                    if (ev.target.value === '') {
                      form.trigger('newPassword')
                    }
                  }}
                  placeholder="*********"
                  type="password"
                  autoComplete="new-password"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* New password */}
        <FormField
          control={form.control}
          name="newPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>New password</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  value={field.value ?? ''}
                  onChange={(ev) => {
                    field.onChange(ev.target.value !== '' ? ev.target.value : undefined)
                    if (ev.target.value === '') {
                      form.trigger('currentPassword')
                    }
                  }}
                  placeholder="*********"
                  type="password"
                  autoComplete="new-password"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Confirm new password */}
        <FormField
          control={form.control}
          name="confirmNewPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  value={field.value ?? ''}
                  placeholder="*********"
                  type="password"
                  autoComplete="new-password"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="text-right">
          <Button type="submit" className="gap-1.5" disabled={changePasswordMutation.isPending}>
            {changePasswordMutation.isPending ? <LoaderCircleIcon className="size-4 animate-spin" /> : null}
            Change password
          </Button>
        </div>
      </form>
    </Form>
  )
}
