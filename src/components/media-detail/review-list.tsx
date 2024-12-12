import { UserAvatar } from '@/components/auth-button'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { MediaType } from '@/lib/schemas/common-media.schema'
import { ReviewDataResponseType } from '@/lib/schemas/reviews.schema'
import { useGetReviewsByMediaQuery } from '@/lib/tanstack-query/use-reviews'
import { format } from 'date-fns'
import { LoaderCircleIcon } from 'lucide-react'
import React from 'react'

export default function ReviewList({ mediaId, mediaType }: { mediaId: number; mediaType: MediaType }) {
  const getReviewsByMediaQuery = useGetReviewsByMediaQuery({ mediaId, mediaType, page: 1 })

  if (getReviewsByMediaQuery.isLoading) {
    return <ReviewListSkeleton />
  }

  return getReviewsByMediaQuery.isSuccess ? (
    <div className="flex flex-col">
      {getReviewsByMediaQuery.isFetching ? <ReviewItemSkeleton /> : null}
      {getReviewsByMediaQuery.data.pages.map((page, index) => (
        <React.Fragment key={index}>
          {page.data.map((review) => (
            <ReviewItem key={review._id} review={review} />
          ))}
        </React.Fragment>
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

function ReviewItem({ review: { updatedAt, user, content } }: { review: ReviewDataResponseType }) {
  const date = format(new Date(updatedAt), 'dd/MM/yyyy - hh:mm a')

  return (
    <div className="flex gap-2 rounded p-3 hover:bg-card-foreground/10 sm:gap-4">
      <UserAvatar avatar={user.avatar} name={user.name} className="size-12" variant="round" />
      <div className="grow">
        <p className="line-clamp-1 font-semibold">{user.name}</p>
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
