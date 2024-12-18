import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import favoritesApi from '@/apis/favorites.api'
import { QUERY_KEY } from '@/constants/tanstack-key'
import { FavoriteByMediaParamsType } from '@/lib/schemas/favorite.schema'
import { useEffect, useState } from 'react'
import { PageQueryType } from '@/lib/schemas/common-media.schema'

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

export function useGetMyFavoritesQuery(query: PageQueryType) {
  const [isInitialRender, setIsInitialRender] = useState(true)

  const queryClient = useQueryClient()

  useEffect(() => {
    if (isInitialRender) {
      setIsInitialRender(false)
      return
    }

    return () => {
      queryClient.removeQueries({ queryKey: [QUERY_KEY.GET_MY_FAVORITES] })
    }
  }, [isInitialRender, queryClient])

  return useInfiniteQuery({
    queryFn: ({ pageParam }) => favoritesApi.getMyFavorites({ page: pageParam }),
    queryKey: [QUERY_KEY.GET_MY_FAVORITES],
    getNextPageParam: (lastPage) =>
      lastPage.pagination.currentPage < lastPage.pagination.totalPages
        ? lastPage.pagination.currentPage + 1
        : undefined,
    initialPageParam: query.page || 1,
  })
}

export function useDeleteFavoriteByIdMutation() {
  return useMutation({
    mutationFn: favoritesApi.deleteFavoriteById,
  })
}
