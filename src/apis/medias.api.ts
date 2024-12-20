import http from '@/utils/http'
import { TopRatedTvsResponseType } from '@/lib/schemas/tv.schema'
import { TopRatedMoviesResponseType } from '@/lib/schemas/movies.schema'
import { SearchResponseType, SearchType } from '@/lib/schemas/search.schema'
import { MediaType, PageQueryType } from '@/lib/schemas/common-media.schema'

const mediasApi = {
  topRated: async (type: MediaType, query?: PageQueryType) => {
    return http.get<TopRatedMoviesResponseType | TopRatedTvsResponseType>(`${type}s/top-rated`, { params: query })
  },

  search: async ({ page, query, type }: { type: SearchType['type']; query: string; page?: number }) => {
    const mediaType = type === 'person' ? 'people' : `${type}s`

    return http.get<SearchResponseType>(`${mediaType}/search`, { params: { query, page } })
  },
}

export default mediasApi
