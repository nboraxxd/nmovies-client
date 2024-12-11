import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { AutosizeTextarea } from '@/components/ui/autosize-textarea'
import { addReviewBodySchema, AddReviewBodyType } from '@/lib/schemas/reviews.schema'
import { LoaderCircleIcon, SendHorizonalIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useAuthStore } from '@/lib/stores/auth-store'
import { UserAvatar } from '@/components/auth-button'
import { useAddReviewMutation } from '@/lib/tanstack-query/use-reviews'
import { isAxiosEntityError } from '@/utils/error'
import { EntityError } from '@/types/error'
import { z } from 'zod'
import { toast } from 'sonner'

const contentSchema = addReviewBodySchema.pick({ content: true })
type ContentType = z.TypeOf<typeof contentSchema>

export default function ReviewForm(props: Omit<AddReviewBodyType, 'content'>) {
  const { mediaId, mediaPoster, mediaReleaseDate, mediaTitle, mediaType } = props

  const profile = useAuthStore((state) => state.profile)

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

  return profile ? (
    <div className="flex gap-2 sm:gap-4">
      <UserAvatar avatar={profile.avatar} name={profile.name} className="mt-1.5 size-12" variant="round" />
      <div className="grow lg:grid lg:grid-cols-[minmax(0,1fr)_220px] lg:gap-8">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <p className="line-clamp-1 text-xl font-semibold">{profile.name}</p>
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
