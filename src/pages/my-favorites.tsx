import { toast } from 'sonner'
import { useInView } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { LoaderCircleIcon, TrashIcon } from 'lucide-react'

import { useDeleteFavoriteByIdMutation, useGetMyFavoritesQuery } from '@/lib/tanstack-query/use-favorites'

import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { MediaCard, MediaCardSkeleton } from '@/components/media-card'
import { GetMyFavoritesResponseType } from '@/lib/schemas/favorite.schema'
import { NotFoundMedia } from '@/components/medias'

export default function MyFavoritesPage() {
  const [myFavorites, setMyFavorites] = useState<GetMyFavoritesResponseType['data']>([])

  const loadingRef = useRef<HTMLDivElement | null>(null)

  const isInView = useInView(loadingRef, { margin: '400px' })

  const {
    data: dataGetMyFavorites,
    isLoading: isLoadingGetMyFavorites,
    isSuccess: isSuccessGetMyFavorites,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useGetMyFavoritesQuery({ page: 1 })

  const deleteFavoriteByIdMutation = useDeleteFavoriteByIdMutation()

  useEffect(() => {
    if (isSuccessGetMyFavorites) {
      setMyFavorites(dataGetMyFavorites.pages.flatMap((page) => page.data))
    }
  }, [dataGetMyFavorites, isSuccessGetMyFavorites])

  useEffect(() => {
    // console.log(isInView, hasNextPage)
    if (isInView && hasNextPage) {
      fetchNextPage()
    }
  }, [fetchNextPage, hasNextPage, isInView])

  useEffect(() => {
    console.log(isInView)
  }, [isInView])

  async function deleteFavoriteById(favoriteId: string) {
    if (isLoadingGetMyFavorites || deleteFavoriteByIdMutation.isPending) return

    const response = await deleteFavoriteByIdMutation.mutateAsync(favoriteId)

    toast.success(response.message)
    setMyFavorites((prev) => prev.filter((item) => item._id !== favoriteId))
  }

  return (
    <>
      {isLoadingGetMyFavorites ? (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 md:gap-4 lg:grid-cols-5 xl:grid-cols-6">
          {Array.from({ length: 12 }).map((_, index) => (
            <div key={index}>
              <MediaCardSkeleton />
              <Skeleton className="mt-1.5 h-9 w-full bg-foreground/10" />
            </div>
          ))}
        </div>
      ) : null}

      {isSuccessGetMyFavorites ? (
        myFavorites.length > 0 ? (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 md:gap-4 lg:grid-cols-5 xl:grid-cols-6">
            {myFavorites.map((item) => (
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
                  disabled={deleteFavoriteByIdMutation.isPending && deleteFavoriteByIdMutation.variables === item._id}
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
          </div>
        ) : (
          <NotFoundMedia
            heading="Oops. No favorite found."
            desc="Try adding some favorites?"
            className="mt-0 h-80 justify-center"
          />
        )
      ) : null}
      <div ref={loadingRef} className="flex justify-center">
        {isFetchingNextPage ? <LoaderCircleIcon className="mt-3 size-6 animate-spin" /> : null}
      </div>
    </>
  )
}
