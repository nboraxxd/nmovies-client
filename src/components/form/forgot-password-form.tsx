import { z } from 'zod'
import { AxiosResponse } from 'axios'
import { useForm } from 'react-hook-form'
import { LoaderCircleIcon } from 'lucide-react'
import { Dispatch, SetStateAction } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { UseMutateAsyncFunction } from '@tanstack/react-query'

import { EntityError } from '@/types/error'
import { isAxiosEntityError } from '@/utils/error'
import envVariables from '@/lib/schemas/env-variables.schema'
import { MessageResponseType } from '@/lib/schemas/common.schema'
import { ForgotPasswordBodyType, forgotPasswordBodySchema } from '@/lib/schemas/auth.schema'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'

interface props {
  isPending: boolean
  setEnableCountdown: Dispatch<SetStateAction<boolean>>
  setIsFirstSubmited: Dispatch<SetStateAction<boolean>>
  mutateAsync: UseMutateAsyncFunction<AxiosResponse<MessageResponseType, any>, Error, ForgotPasswordBodyType>
}

export default function ForgotPasswordForm({ isPending, mutateAsync, setEnableCountdown, setIsFirstSubmited }: props) {
  const form = useForm<ForgotPasswordBodyType>({
    resolver: zodResolver(forgotPasswordBodySchema),
    defaultValues: {
      email: '',
      clientUrl: envVariables.VITE_CLIENT_URL,
    },
  })

  async function onValid(values: ForgotPasswordBodyType) {
    if (isPending) return

    try {
      await mutateAsync(values)
      setEnableCountdown(true)
      setIsFirstSubmited(true)
    } catch (error) {
      if (isAxiosEntityError<EntityError>(error)) {
        const formErrors = error.response?.data
        if (formErrors) {
          formErrors.errors.forEach(({ path, message }) => {
            form.setError(path as keyof ForgotPasswordBodyType, { message, type: z.ZodIssueCode.custom })
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
        <Button type="submit" className="w-full gap-1.5" disabled={isPending}>
          {isPending ? <LoaderCircleIcon className="size-4 animate-spin" /> : null}
          Continue
        </Button>
      </form>
    </Form>
  )
}
