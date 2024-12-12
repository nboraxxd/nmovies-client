import { MediaCard, MediaCardSkeleton } from '@/components/media-card'
import { Button } from '@/components/ui/button'
import { useGetMyFavoritesQuery } from '@/lib/tanstack-query/use-favorites'
import { TrashIcon } from 'lucide-react'

export default function MyFavoritesPage() {
  const getMyFavoritesQuery = useGetMyFavoritesQuery()

  if (getMyFavoritesQuery.isLoading) {
    return (
      <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 md:gap-4 lg:grid-cols-5 xl:grid-cols-6">
        {Array.from({ length: 12 }).map((_, index) => (
          <MediaCardSkeleton key={index} />
        ))}
      </div>
    )
  }

  return (
    <main className="container mt-10 sm:px-6 lg:px-8">
      {getMyFavoritesQuery.isSuccess ? (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 md:gap-4 lg:grid-cols-5 xl:grid-cols-6">
          {getMyFavoritesQuery.data.data.map((item) => (
            <div key={item._id} className="flex flex-col">
              <MediaCard
                id={item.mediaId}
                title={item.mediaTitle}
                mediaType={item.mediaType}
                posterPath={item.mediaPoster ?? undefined}
                releaseDate={item.mediaReleaseDate}
                voteAverage={0}
              />
              <Button className="mt-1.5 gap-1.5">
                <TrashIcon className="size-4" />
                Remove
              </Button>
            </div>
          ))}
        </div>
      ) : null}
    </main>
  )
}
