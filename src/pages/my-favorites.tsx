import { toast } from 'sonner'
import { useInView } from 'framer-motion'
import { Fragment, useEffect, useRef } from 'react'
import { LoaderCircleIcon, TrashIcon } from 'lucide-react'

import { useDeleteFavoriteByIdMutation, useGetMyFavoritesQuery } from '@/lib/tanstack-query/use-favorites'

import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { NotFoundMedia } from '@/components/medias'
import { MediaCard, MediaCardSkeleton } from '@/components/media-card'

export default function MyFavoritesPage() {
  const getMyFavoritesQuery = useGetMyFavoritesQuery()
  const { fetchNextPage, hasNextPage, isFetchingNextPage } = getMyFavoritesQuery

  const deleteFavoriteByIdMutation = useDeleteFavoriteByIdMutation()

  async function deleteFavoriteById(favoriteId: string) {
    if (deleteFavoriteByIdMutation.isPending) return

    const response = await deleteFavoriteByIdMutation.mutateAsync(favoriteId)

    toast.success(response.message)
  }

  return (
    <>
      {getMyFavoritesQuery.isLoading ? (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 md:gap-4 lg:grid-cols-5 xl:grid-cols-6">
          {Array.from({ length: 12 }).map((_, index) => (
            <div key={index}>
              <MediaCardSkeleton />
              <Skeleton className="mt-1.5 h-9 w-full bg-foreground/10" />
            </div>
          ))}
        </div>
      ) : null}

      {getMyFavoritesQuery.isSuccess ? (
        getMyFavoritesQuery.data.pages.length >= 1 && getMyFavoritesQuery.data.pages[0].data.length > 0 ? (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 md:gap-4 lg:grid-cols-5 xl:grid-cols-6">
            {getMyFavoritesQuery.data.pages.map((page, index) => (
              <Fragment key={index}>
                {page.data.map((item) => (
                  <div key={item._id} className="flex flex-col">
                    <MediaCard
                      id={item.mediaId}
                      title={item.mediaTitle}
                      mediaType={item.mediaType}
                      posterPath={item.mediaPoster ?? undefined}
                      releaseDate={item.mediaReleaseDate}
                      voteAverage={0}
                    />
                    <Button
                      key={item._id}
                      className="mt-1.5 gap-1.5"
                      disabled={
                        deleteFavoriteByIdMutation.isPending && deleteFavoriteByIdMutation.variables === item._id
                      }
                      onClick={() => deleteFavoriteById(item._id)}
                    >
                      {deleteFavoriteByIdMutation.isPending && deleteFavoriteByIdMutation.variables === item._id ? (
                        <LoaderCircleIcon className="size-4 animate-spin" />
                      ) : (
                        <TrashIcon className="size-4" />
                      )}
                      Remove
                    </Button>
                  </div>
                ))}
              </Fragment>
            ))}
          </div>
        ) : (
          <NotFoundMedia
            heading="Oops. No favorite found."
            desc="Try adding some favorites?"
            className="mt-0 h-80 justify-center"
          />
        )
      ) : null}
      {getMyFavoritesQuery.isSuccess ? (
        <LoadMoreIndicator
          fetchNextPage={fetchNextPage}
          hasNextPage={hasNextPage}
          isFetchingNextPage={isFetchingNextPage}
        />
      ) : null}
    </>
  )
}

function LoadMoreIndicator({
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
}: {
  fetchNextPage: () => void
  hasNextPage: boolean
  isFetchingNextPage: boolean
}) {
  const ref = useRef<HTMLDivElement | null>(null)

  const isInView = useInView(ref, { margin: '400px' })
  useEffect(() => {
    console.log({ isInView, hasNextPage, ref: ref.current })
    if (isInView && hasNextPage) {
      fetchNextPage()
    }
  }, [fetchNextPage, hasNextPage, isInView])

  return (
    <div ref={ref} className="flex justify-center">
      {isFetchingNextPage ? <LoaderCircleIcon className="mt-3 size-6 animate-spin" /> : null}
    </div>
  )
}
