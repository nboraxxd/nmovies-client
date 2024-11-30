import { toast } from 'sonner'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { HeartIcon, LoaderCircleIcon } from 'lucide-react'

import { MediaType } from '@/lib/schemas/common-media.schema'
import {
  useAddFavoriteMutation,
  useCheckFavoriteByMediaQuery,
  useDeleteFavoriteByMediaMutation,
} from '@/lib/tanstack-query/use-favorites'

import { Button } from '@/components/ui/button'

interface Props {
  mediaTitle: string
  mediaReleaseDate: string
  mediaPoster: string | null
}

export default function FavoriteButton(props: Props) {
  const { mediaTitle, mediaReleaseDate, mediaPoster } = props

  const params = useParams<Record<'movieId' | 'tvId', string>>()
  const mediaId = Number(params.movieId || params.tvId)
  const mediaType: MediaType = params.movieId ? 'movie' : 'tv'

  const checkFavoriteByMediaQuery = useCheckFavoriteByMediaQuery({ mediaId, mediaType })

  const [isFavorite, setIsFavorite] = useState<boolean | undefined>()

  const addFavoriteMutation = useAddFavoriteMutation()
  const deleteFavoriteMutation = useDeleteFavoriteByMediaMutation()

  const isDisabled = addFavoriteMutation.isPending || deleteFavoriteMutation.isPending

  useEffect(() => {
    if (checkFavoriteByMediaQuery.isSuccess) {
      setIsFavorite(checkFavoriteByMediaQuery.data.data.isFavorite)
    }
  }, [checkFavoriteByMediaQuery.data?.data.isFavorite, checkFavoriteByMediaQuery.isSuccess])

  async function handleAddFavorite() {
    if (addFavoriteMutation.isPending) return

    const response = await addFavoriteMutation.mutateAsync({
      mediaId,
      mediaPoster,
      mediaTitle,
      mediaReleaseDate,
      mediaType,
    })

    setIsFavorite(true)
    toast.success(response.message)
  }

  async function handleRemoveFavorite() {
    if (deleteFavoriteMutation.isPending) return

    const response = await deleteFavoriteMutation.mutateAsync({ mediaId, mediaType })

    setIsFavorite(false)
    toast.success(response.message)
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={!isFavorite ? handleAddFavorite : handleRemoveFavorite}
      disabled={isDisabled}
    >
      {isDisabled ? (
        <LoaderCircleIcon className="size-6 animate-spin" />
      ) : (
        <HeartIcon className="size-6 text-primary" fill={isFavorite ? '#e00000' : 'transparent'} />
      )}
    </Button>
  )
}
