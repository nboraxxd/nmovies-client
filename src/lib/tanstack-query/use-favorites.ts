import { InfiniteData, useInfiniteQuery, useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import { useEffect, useState } from 'react'
import favoritesApi from '@/apis/favorites.api'
import { QUERY_KEY } from '@/constants/tanstack-key'
import { FavoriteByMediaParamsType, GetMyFavoritesResponseType } from '@/lib/schemas/favorite.schema'
import { CursorPageQueryType } from '@/lib/schemas/common-media.schema'
import envVariables from '@/lib/schemas/env-variables.schema'

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

export function useGetMyFavoritesQuery(query?: CursorPageQueryType) {
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
    queryFn: ({ pageParam }) => favoritesApi.getMyFavorites({ cursor: pageParam }),
    queryKey: [QUERY_KEY.GET_MY_FAVORITES],
    getNextPageParam: (lastPage) => (lastPage.hasNextPage ? lastPage.data.at(-1)?._id : undefined),
    initialPageParam: query?.cursor,
  })
}

export function useDeleteFavoriteByIdMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: favoritesApi.deleteFavoriteById,
    onSuccess: (_, favoriteId) => {
      queryClient.setQueryData<InfiniteData<GetMyFavoritesResponseType>>([QUERY_KEY.GET_MY_FAVORITES], (oldData) => {
        if (!oldData) return oldData

        if (
          oldData.pages.length === 1 &&
          oldData.pages[0].data.length <= envVariables.VITE_FAVORITES_PER_PAGE_LIMIT &&
          oldData.pages[0].hasNextPage
        ) {
          queryClient.invalidateQueries({
            queryKey: [QUERY_KEY.GET_MY_FAVORITES],
          })
        }

        return {
          ...oldData,
          pages: oldData.pages.map((favoritesData) => ({
            ...favoritesData,
            data: favoritesData.data.filter((item) => item._id !== favoriteId),
          })),
        }
      })
    },
  })
}
