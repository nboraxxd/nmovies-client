import http from '@/utils/http'
import { MessageResponseType } from '@/lib/schemas/common.schema'
import {
  AddFavoriteBodyType,
  AddFavoriteResponseType,
  CheckFavoriteByMediaResponseType,
  FavoriteByMediaParamsType,
} from '@/lib/schemas/favorite.schema'

const FAVORITES_PREFIX = '/favorites'

const favoritesApi = {
  addFavorite: async (body: AddFavoriteBodyType) => {
    return http.post<AddFavoriteResponseType>(`${FAVORITES_PREFIX}`, body)
  },

  checkFavoriteByMedia: async ({ mediaId, mediaType }: FavoriteByMediaParamsType) => {
    return http.get<CheckFavoriteByMediaResponseType>(`${FAVORITES_PREFIX}/medias/check/${mediaId}/${mediaType}`)
  },

  deleteFavoriteByMedia: async ({ mediaId, mediaType }: FavoriteByMediaParamsType) => {
    return http.delete<MessageResponseType>(`${FAVORITES_PREFIX}/medias/${mediaId}/${mediaType}`)
  },
}

export default favoritesApi
