import { useMutation, useQuery } from '@tanstack/react-query'

import favoritesApi from '@/apis/favorites.api'
import { QUERY_KEY } from '@/constants/tanstack-key'
import { FavoriteByMediaParamsType } from '@/lib/schemas/favorite.schema'

export function useAddFavoriteMutation() {
  return useMutation({
    mutationFn: favoritesApi.addFavorite,
  })
}

export function useCheckFavoriteByMediaQuery(params: FavoriteByMediaParamsType) {
  return useQuery({
    queryFn: () => favoritesApi.checkFavoriteByMedia(params),
    queryKey: [QUERY_KEY.CHECK_FAVORITE_BY_MEDIA, params],
  })
}

export function useDeleteFavoriteByMediaMutation() {
  return useMutation({
    mutationFn: favoritesApi.deleteFavoriteByMedia,
  })
}
