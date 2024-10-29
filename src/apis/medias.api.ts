import http from '@/utils/http'
import { TopRatedTvsResponseType } from '@/lib/schemas/tv.schema'
import { TopRatedMoviesResponseType } from '@/lib/schemas/movies.schema'
import { MediaType, PageQueryType } from '@/lib/schemas/common-media.schema'

const mediasApi = {
  // discoverMedia: async (param, query?: DiscoverQueryType) => {
  //   return http.get<DiscoverMoviesResponseType>(`${MOVIES_PREFIX}/discover`, { params: query })
  // },

  topRated: async (type: MediaType, query?: PageQueryType) => {
    return http.get<TopRatedMoviesResponseType | TopRatedTvsResponseType>(`${type}s/top-rated`, { params: query })
  },
}

export default mediasApi
