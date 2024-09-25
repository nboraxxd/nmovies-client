import http from '@/utils/http'
import { MoviesResponseType } from '@/lib/schemas/movies.schema'
import { DiscoverQueryType, MediaType } from '@/lib/schemas/discover.schema'

const discoverApi = {
  getList: async (params: MediaType, query: DiscoverQueryType) => {
    const { includeAdult, includeVideo, page, sortBy, voteAverageGte, voteAverageLte, withGenres } = query

    return http.get<MoviesResponseType>(`/discover/${params.mediaType}`, {
      params: { includeAdult, includeVideo, page, sortBy, voteAverageGte, voteAverageLte, withGenres },
    })
  },
}

export default discoverApi
