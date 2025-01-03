import { toast } from 'sonner'
import { Fragment } from 'react'
import { format } from 'date-fns'
import { LoaderCircleIcon, Trash2Icon } from 'lucide-react'

import { MediaType } from '@/lib/schemas/common-media.schema'
import { ReviewDataResponseType } from '@/lib/schemas/reviews.schema'
import { useDeleteReviewMutation, useGetReviewsByMediaQuery } from '@/lib/tanstack-query/use-reviews'

import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { UserAvatar } from '@/components/auth-button'
import { useAuthStore } from '@/lib/stores/auth-store'
import { QUERY_KEY } from '@/constants/tanstack-key'
import { NotFoundMedia } from '@/components/medias'

export default function ReviewList({ mediaId, mediaType }: { mediaId: number; mediaType: MediaType }) {
  const getReviewsByMediaQuery = useGetReviewsByMediaQuery({ mediaId, mediaType })

  if (getReviewsByMediaQuery.isLoading) {
    return <ReviewListSkeleton />
  }

  if (
    getReviewsByMediaQuery.isSuccess &&
    getReviewsByMediaQuery.data.pages.length === 1 &&
    getReviewsByMediaQuery.data.pages[0].data.length === 0
  ) {
    return <NotFoundMedia heading="Oops! No reviews found" desc="Be the first to review this media" />
  }

  return getReviewsByMediaQuery.isSuccess &&
    getReviewsByMediaQuery.data.pages.length >= 1 &&
    getReviewsByMediaQuery.data.pages[0].data.length > 0 ? (
    <div className="flex flex-col">
      {getReviewsByMediaQuery.data.pages.map((page, index) => (
        <Fragment key={index}>
          {page.data.map((review) => (
            <ReviewItem key={review._id} review={review} />
          ))}
        </Fragment>
      ))}
      {getReviewsByMediaQuery.hasNextPage ? (
        <div className="mx-auto">
          <Button
            size="sm"
            className="mt-3 w-fit gap-1.5"
            onClick={() => getReviewsByMediaQuery.fetchNextPage()}
            disabled={getReviewsByMediaQuery.isFetchingNextPage}
          >
            {getReviewsByMediaQuery.isFetchingNextPage ? <LoaderCircleIcon className="size-3 animate-spin" /> : null}
            Load More
          </Button>
        </div>
      ) : null}
    </div>
  ) : null
}

function ReviewItem({ review }: { review: ReviewDataResponseType }) {
  const { createdAt, user, content, _id, mediaId, mediaType } = review

  const profile = useAuthStore((state) => state.profile)

  const deleteReviewMutation = useDeleteReviewMutation()

  const date = format(new Date(createdAt), 'dd/MM/yyyy - hh:mm a')

  async function handleDeleteReview() {
    if (deleteReviewMutation.isPending) return

    const response = await deleteReviewMutation.mutateAsync({
      reviewId: _id,
      queryKey: [QUERY_KEY.REVIEWS_BY_MEDIA, mediaType, mediaId],
    })

    toast.success(response.message)
  }

  return (
    <div className="flex gap-3 overflow-x-auto rounded p-3 transition-colors hover:bg-card-foreground/10">
      <UserAvatar avatar={user.avatar} name={user.name} className="mt-0.5 hidden size-12 md:flex" variant="round" />
      <div className="grow">
        <div className="flex items-center">
          <p className="line-clamp-1 font-semibold">{user.name}</p>
          {profile?._id === user._id ? (
            <Button
              size="sm"
              className="ml-auto px-2"
              variant="ghost"
              onClick={handleDeleteReview}
              disabled={deleteReviewMutation.isPending}
            >
              <Trash2Icon className="size-4" />
            </Button>
          ) : null}
        </div>
        <p className="mt-px text-xs text-foreground/50">{date}</p>
        <p className="mt-1.5">{content}</p>
      </div>
    </div>
  )
}

export function ReviewListSkeleton() {
  return (
    <div>
      {Array.from({ length: 5 }).map((_, index) => (
        <ReviewItemSkeleton key={index} />
      ))}
    </div>
  )
}

function ReviewItemSkeleton() {
  return (
    <div className="flex gap-2 rounded p-3 sm:gap-4">
      <Skeleton className="hidden size-12 rounded-full bg-foreground/15 md:block" />
      <div className="grow">
        <Skeleton className="h-6 w-1/6 bg-foreground/15" />
        <Skeleton className="mt-1.5 h-5 w-1/2 bg-foreground/15" />
        <Skeleton className="mt-1.5 h-5 w-1/3 bg-foreground/15" />
      </div>
    </div>
  )
}
