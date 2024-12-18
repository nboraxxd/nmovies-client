import { Fragment, useEffect } from 'react'
import { format } from 'date-fns'
import { LoaderCircleIcon } from 'lucide-react'

import { MediaType } from '@/lib/schemas/common-media.schema'
import { ReviewDataResponseType } from '@/lib/schemas/reviews.schema'
import { useDeleteReviewMutation, useGetReviewsByMediaQuery } from '@/lib/tanstack-query/use-reviews'

import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { UserAvatar } from '@/components/auth-button'
import { TrashIcon } from '@radix-ui/react-icons'
import { toast } from 'sonner'

export default function ReviewList({ mediaId, mediaType }: { mediaId: number; mediaType: MediaType }) {
  const getReviewsByMediaQuery = useGetReviewsByMediaQuery({ mediaId, mediaType })

  // const review = useReviewStore((state) => state.review)
  // const setReview = useReviewStore((state) => state.setReview)

  // useEffect(() => {
  //   if (!getReviewsByMediaQuery.isFetching && review) {
  //     setReview(null)
  //   }
  // }, [getReviewsByMediaQuery.isFetching, review, setReview])

  if (getReviewsByMediaQuery.isLoading) {
    return <ReviewListSkeleton />
  }

  return getReviewsByMediaQuery.isSuccess ? (
    <div className="flex flex-col">
      {/* {review ? <ReviewItem key={review._id} review={review} /> : null} */}
      {getReviewsByMediaQuery.data.pages.map((page) => (
        <Fragment key={page.pagination.currentPage}>
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

function ReviewItem({ review: { updatedAt, user, content, _id } }: { review: ReviewDataResponseType }) {
  const deleteReviewMutation = useDeleteReviewMutation()

  const date = format(new Date(updatedAt), 'dd/MM/yyyy - hh:mm a')

  async function handleDeleteReview() {
    if (deleteReviewMutation.isPending) return

    const response = await deleteReviewMutation.mutateAsync(_id)

    toast.success(response.message)
  }

  return (
    <div className="flex gap-2 overflow-x-auto rounded p-3 hover:bg-card-foreground/10 sm:gap-4">
      <UserAvatar avatar={user.avatar} name={user.name} className="hidden size-12 md:flex" variant="round" />
      <div className="grow">
        <div className="flex">
          <p className="line-clamp-1 font-semibold">{user.name}</p>
          <Button size="sm" className="ml-auto" onClick={handleDeleteReview} disabled={deleteReviewMutation.isPending}>
            <TrashIcon className="size-4" />
          </Button>
        </div>
        <p className="text-xs text-foreground/50">{date}</p>
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
      <Skeleton className="size-12 rounded-full bg-foreground/15" />
      <div className="grow">
        <Skeleton className="h-6 w-1/6 bg-foreground/15" />
        <Skeleton className="mt-1.5 h-5 w-1/2 bg-foreground/15" />
        <Skeleton className="mt-1.5 h-5 w-1/3 bg-foreground/15" />
      </div>
    </div>
  )
}
