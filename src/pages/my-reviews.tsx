import { Fragment } from 'react'
import { format } from 'date-fns'
import { Link } from 'react-router-dom'
import { Trash2Icon } from 'lucide-react'

import { GetMyReviewsResponseType } from '@/lib/schemas/reviews.schema'
import { useDeleteReviewMutation, useGetMyReviewsQuery } from '@/lib/tanstack-query/use-reviews'

import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { Card, CardTitle } from '@/components/ui/card'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import { NotFoundMedia } from '@/components/medias'
import { LazyLoadImage, LoadMoreIndicator } from '@/components/common'
import placeholderPoster from '/placeholder-poster.svg'
import { QUERY_KEY } from '@/constants/tanstack-key'
import { toast } from 'sonner'
import { cn } from '@/utils'

export default function MyReviewsPage() {
  const getMyReviewsQuery = useGetMyReviewsQuery()
  const { fetchNextPage, hasNextPage, isFetchingNextPage } = getMyReviewsQuery

  return (
    <div className="mx-auto w-full max-w-5xl">
      {getMyReviewsQuery.isLoading ? (
        <div className="flex flex-col gap-5">
          {Array.from({ length: 12 }).map((_, index) => (
            <Card key={index} className="flex items-start gap-2 rounded-sm p-3 md:gap-5">
              <div className="hidden w-1/6 shrink-0 sm:block">
                <AspectRatio ratio={2 / 3}>
                  <Skeleton className="size-full" />
                </AspectRatio>
              </div>
              <div className="flex-1 space-y-1">
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-4 w-1/4" />
                {Array.from({ length: 4 }).map((_, index) => (
                  <Skeleton key={index} className="h-4 w-full last:w-2/3" />
                ))}
              </div>
            </Card>
          ))}
        </div>
      ) : null}

      {getMyReviewsQuery.isSuccess ? (
        getMyReviewsQuery.data.pages.length >= 1 && getMyReviewsQuery.data.pages[0].data.length > 0 ? (
          <div className="flex flex-col gap-5">
            {getMyReviewsQuery.data.pages.map((page, index) => (
              <Fragment key={index}>
                {page.data.map((item) => (
                  <ReviewItem key={item._id} review={item} />
                ))}
              </Fragment>
            ))}
          </div>
        ) : (
          <NotFoundMedia
            heading="Oops. No reviews found."
            desc="Try adding some reviews to your favorite media."
            className="mt-0 h-80 justify-center"
          />
        )
      ) : null}

      {hasNextPage ? (
        <LoadMoreIndicator
          fetchNextPage={fetchNextPage}
          hasNextPage={hasNextPage}
          isFetchingNextPage={isFetchingNextPage}
        />
      ) : null}
    </div>
  )
}

function ReviewItem({ review }: { review: GetMyReviewsResponseType['data'][0] }) {
  const { _id, content, createdAt, mediaId, mediaPoster, mediaTitle, mediaType } = review
  const date = format(new Date(createdAt), 'dd/MM/yyyy - hh:mm a')
  const link = `/${mediaType}s/${mediaId}`

  const deleteReviewMutation = useDeleteReviewMutation()

  async function handleDeleteReview() {
    if (deleteReviewMutation.isPending) return

    const response = await deleteReviewMutation.mutateAsync({
      reviewId: _id,
      queryKey: [QUERY_KEY.GET_MY_REVIEWS],
    })

    toast.success(response.message)
  }

  return (
    <Card
      className={cn('flex items-start gap-2 rounded-sm p-3 md:gap-5', {
        'opacity-50': deleteReviewMutation.isPending,
        'transition-colors hover:bg-card-foreground/10': !deleteReviewMutation.isPending,
      })}
    >
      <Link to={link} className="hidden w-1/6 shrink-0 sm:inline-block">
        <AspectRatio ratio={2 / 3}>
          <LazyLoadImage src={mediaPoster || placeholderPoster} alt={mediaTitle} className="rounded-sm" />
          {mediaType === 'tv' ? (
            <div className="absolute right-1 top-1 hidden rounded bg-background p-1 text-sm text-foreground shadow-md lg:block">
              TV Shows
            </div>
          ) : null}
        </AspectRatio>
      </Link>
      <div className="grow">
        <div className="flex items-center gap-4">
          <Link to={link}>
            <CardTitle className="sm:text-lg">{mediaTitle}</CardTitle>
          </Link>
          <Button
            size="sm"
            className="ml-auto bg-primary px-2 hover:bg-primary/90"
            variant="ghost"
            onClick={handleDeleteReview}
            disabled={deleteReviewMutation.isPending}
          >
            <Trash2Icon className="size-4" />
          </Button>
        </div>
        <p className="mt-px text-xs text-foreground/50">{date}</p>
        <p className="mt-1.5 text-foreground/60">{content}</p>
      </div>
    </Card>
  )
}
