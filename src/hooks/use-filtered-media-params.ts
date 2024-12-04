import omitBy from 'lodash/omitBy'
import queryString from 'query-string'
import isUndefined from 'lodash/isUndefined'
import { useLocation } from 'react-router-dom'
import { MOVIE_SORT_LIST, TV_SORT_LIST } from '@/constants'

export default function useFilteredMediaParams<T>() {
  const { search, pathname } = useLocation()
  const queryParams = queryString.parse(search)

  const sortList: string[] = pathname === '/movies' ? MOVIE_SORT_LIST : TV_SORT_LIST

  const queryParamsFiltered = omitBy(
    {
      voteAverageGte: Number(queryParams.voteAverageGte) ? Number(queryParams.voteAverageGte) : undefined,
      voteAverageLte: Number(queryParams.voteAverageLte) ? Number(queryParams.voteAverageLte) : undefined,
      sortBy:
        typeof queryParams.sortBy === 'string' && sortList.includes(queryParams.sortBy)
          ? queryParams.sortBy
          : undefined,
      withGenres:
        typeof queryParams.withGenres === 'string' && /^(\d+)(,\d+)*$/.test(queryParams.withGenres)
          ? queryParams.withGenres
          : undefined,
      page: Number(queryParams.page) ? Number(queryParams.page) : undefined,
    },
    isUndefined
  )

  return queryParamsFiltered as T
}
