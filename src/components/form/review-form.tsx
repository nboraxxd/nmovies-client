import { z } from 'zod'
import { toast } from 'sonner'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { LoaderCircleIcon, SendHorizonalIcon } from 'lucide-react'

import { EntityError } from '@/types/error'
import { isAxiosEntityError } from '@/utils/error'
import { useGetProfileQuery } from '@/lib/tanstack-query/use-profile'
import { useAddReviewMutation } from '@/lib/tanstack-query/use-reviews'
import { addReviewBodySchema, AddReviewBodyType } from '@/lib/schemas/reviews.schema'

import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { AutosizeTextarea } from '@/components/ui/autosize-textarea'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { UserAvatar } from '@/components/auth-button'

const contentSchema = addReviewBodySchema.pick({ content: true })
type ContentType = z.TypeOf<typeof contentSchema>

export default function ReviewForm(props: Omit<AddReviewBodyType, 'content'>) {
  const { mediaId, mediaPoster, mediaReleaseDate, mediaTitle, mediaType } = props

  const profileQuery = useGetProfileQuery()

  const form = useForm<ContentType>({
    resolver: zodResolver(contentSchema),
    defaultValues: {
      content: '',
    },
  })

  const addReviewMutation = useAddReviewMutation()

  async function onSubmit({ content }: ContentType) {
    if (addReviewMutation.isPending) return

    try {
      if (profileQuery.isSuccess) {
        const response = await addReviewMutation.mutateAsync({
          content,
          mediaId,
          mediaPoster,
          mediaReleaseDate,
          mediaTitle,
          mediaType,
        })

        toast.success(response.message)
        form.reset()
      }
    } catch (error) {
      if (isAxiosEntityError<EntityError>(error)) {
        const formErrors = error.response?.data
        if (formErrors) {
          formErrors.errors.forEach(({ path, message }) => {
            form.setError(path as keyof ContentType, { message, type: z.ZodIssueCode.custom })
          })
        }
      }
    }
  }

  if (profileQuery.isLoading) return <ReviewFormSkeleton />

  return profileQuery.isSuccess ? (
    <div className="flex gap-2 sm:gap-4">
      <UserAvatar
        avatar={profileQuery.data.data.avatar}
        name={profileQuery.data.data.name}
        className="hidden size-12 md:flex"
        variant="round"
      />
      <div className="grow">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <p className="line-clamp-1 text-xl font-semibold">{profileQuery.data.data.name}</p>
                  <FormControl className="mt-3">
                    <AutosizeTextarea minHeight={100} maxHeight={200} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" size="lg" className="gap-1.5 px-6 text-lg" disabled={addReviewMutation.isPending}>
              {addReviewMutation.isPending ? (
                <LoaderCircleIcon className="size-5 animate-spin" />
              ) : (
                <SendHorizonalIcon className="size-5" />
              )}
              Post
            </Button>
          </form>
        </Form>
      </div>
    </div>
  ) : null
}

export function ReviewFormSkeleton() {
  return (
    <div className="flex gap-2 sm:gap-4">
      <Skeleton className="mt-1.5 size-12 rounded-full bg-foreground/15" />
      <div className="grow">
        <div>
          <Skeleton className="h-7 w-1/6 bg-foreground/15" />
          <Skeleton className="mt-3 h-28 w-full bg-foreground/15" />
          <Skeleton className="mt-3 h-10 w-28 bg-foreground/15" />
        </div>
      </div>
    </div>
  )
}
