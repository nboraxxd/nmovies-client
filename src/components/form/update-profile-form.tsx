import { z } from 'zod'
import { toast } from 'sonner'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { LoaderCircleIcon, UploadIcon } from 'lucide-react'
import { useEffect, useMemo, useRef, useState } from 'react'

import { EntityError } from '@/types/error'
import { isEntityError } from '@/utils/error'
import { AVATAR_SIZE_LIMIT } from '@/constants'
import { updateProfileBodySchema, UpdateProfileBodyType } from '@/lib/schemas/profile.schema'
import { useGetProfileQuery, useUpdateProfileMutation, useUploadAvatarMutation } from '@/lib/tanstack-query/use-profile'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'

export default function UpdateProfileForm() {
  const [file, setFile] = useState<File | null>(null)
  const avatarInputRef = useRef<HTMLInputElement>(null)

  const getProfileQuery = useGetProfileQuery()
  const uploadAvatarMutation = useUploadAvatarMutation()
  const updateProfileMutation = useUpdateProfileMutation()

  const isProcessingForm =
    uploadAvatarMutation.isPending || updateProfileMutation.isPending || !getProfileQuery.isSuccess

  const form = useForm<UpdateProfileBodyType>({
    resolver: zodResolver(updateProfileBodySchema),
    defaultValues: {
      name: getProfileQuery.data?.data.name ?? '',
      avatar: getProfileQuery.data?.data.avatar ?? undefined,
    },
  })

  const avatar = form.watch('avatar')

  const previewAvatar = useMemo(() => {
    if (file) {
      return URL.createObjectURL(file)
    }
    return avatar
  }, [avatar, file])

  useEffect(() => {
    return () => {
      if (file && previewAvatar) {
        URL.revokeObjectURL(previewAvatar)
      }
    }
  }, [file, previewAvatar])

  useEffect(() => {
    if (getProfileQuery.isSuccess) {
      form.reset({
        avatar: getProfileQuery.data.data.avatar ?? undefined,
        name: getProfileQuery.data.data.name,
      })
    }
  }, [form, getProfileQuery.data?.data.avatar, getProfileQuery.data?.data.name, getProfileQuery.isSuccess])

  function onChangeAvatar(ev: React.ChangeEvent<HTMLInputElement>) {
    form.clearErrors('avatar')

    const file = ev.target.files?.[0]
    if (file) {
      if (file.size > AVATAR_SIZE_LIMIT) {
        form.setError('avatar', { message: 'Avatar must be less than 1MB', type: z.ZodIssueCode.custom })
        return
      } else if (!file.type.startsWith('image/')) {
        form.setError('avatar', { message: 'Avatar must be an image', type: z.ZodIssueCode.custom })
        return
      }

      setFile(file)
    }
  }

  async function onValid(values: UpdateProfileBodyType) {
    if (isProcessingForm) return

    if (values.avatar === previewAvatar && values.name === getProfileQuery.data.data.name) {
      toast.info('No changes detected')
      return
    }

    try {
      if (file) {
        const form = new FormData()
        form.append('avatar', file)

        const uploadAvatarRes = await uploadAvatarMutation.mutateAsync(form)
        values.avatar = uploadAvatarRes.data
      }

      const updateProfileRes = await updateProfileMutation.mutateAsync(values)

      toast.success(updateProfileRes.message)
      setFile(null)
    } catch (error) {
      if (isEntityError<EntityError>(error)) {
        const formErrors = error.response?.data
        if (formErrors) {
          formErrors.errors.forEach(({ path, message }) => {
            form.setError(path as keyof UpdateProfileBodyType, { message, type: z.ZodIssueCode.custom })
          })
        }
      }
    }
  }

  return (
    <Form {...form}>
      <form className="w-full space-y-4" noValidate onSubmit={form.handleSubmit(onValid)}>
        {/* Avatar */}
        <FormField
          control={form.control}
          name="avatar"
          render={() => (
            <FormItem className="flex flex-col items-center gap-1">
              {getProfileQuery.isSuccess ? (
                <Avatar className="size-20">
                  {previewAvatar ? (
                    <img
                      src={previewAvatar}
                      alt={getProfileQuery.data.data.name}
                      className="relative flex size-full shrink-0 object-cover"
                    />
                  ) : (
                    <AvatarFallback className="text-2xl font-semibold">
                      {getProfileQuery.data.data.name.slice(0, 2).toLocaleUpperCase()}
                    </AvatarFallback>
                  )}
                </Avatar>
              ) : (
                <Skeleton className="size-20 rounded-full" />
              )}
              <Input
                placeholder="Upload image"
                type="file"
                accept="image/*"
                className="hidden"
                ref={avatarInputRef}
                onChange={onChangeAvatar}
              />
              <Button
                type="button"
                size="sm"
                variant="secondary"
                className="gap-1.5"
                onClick={() => avatarInputRef.current?.click()}
              >
                <UploadIcon className="size-4" />
                Change image
              </Button>
              <FormDescription>Maxium image size: 1MB</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Name */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Bruce Wayne" autoComplete="name" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="text-right">
          <Button type="submit" className="gap-1.5" disabled={isProcessingForm}>
            {uploadAvatarMutation.isPending || updateProfileMutation.isPending ? (
              <LoaderCircleIcon className="size-4 animate-spin" />
            ) : null}
            Update profile
          </Button>
        </div>
      </form>
    </Form>
  )
}