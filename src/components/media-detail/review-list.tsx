import { UserAvatar } from '@/components/auth-button'
import { MediaType } from '@/lib/schemas/common-media.schema'
import { ReviewDataResponseType } from '@/lib/schemas/reviews.schema'
import { useGetReviewsByMediaQuery } from '@/lib/tanstack-query/use-reviews'
import { format } from 'date-fns'

export default function ReviewList({ mediaId, mediaType }: { mediaId: number; mediaType: MediaType }) {
  const getReviewsByMediaQuery = useGetReviewsByMediaQuery({ mediaId, mediaType })

  return getReviewsByMediaQuery.isSuccess ? (
    <div className="mt-5">
      {getReviewsByMediaQuery.data.data.map((review) => (
        <ReviewItem key={review._id} review={review} />
      ))}
    </div>
  ) : null
}

function ReviewItem({ review: { updatedAt, user, content } }: { review: ReviewDataResponseType }) {
  const date = format(new Date(updatedAt), 'dd/MM/yyyy - hh:mm a')
  return (
    <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_220px] lg:gap-8">
      <div className="flex gap-2 rounded p-3 hover:bg-card-foreground/10 sm:gap-4">
        <UserAvatar avatar={user.avatar} name={user.name} className="size-12" variant="round" />
        <div className="">
          <div>
            <p className="line-clamp-1 font-semibold">{user.name}</p>
            <p className="text-xs text-foreground/50">{date}</p>
            <p className="mt-1.5">{content}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
