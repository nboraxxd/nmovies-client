import queryString from 'query-string'
import omitBy from 'lodash/omitBy'
import isUndefined from 'lodash/isUndefined'
import { useLocation } from 'react-router-dom'

export default function useFilteredMediaParams<T>(sortList: T[]) {
  const { search } = useLocation()
  const queryParams = queryString.parse(search)

  const queryParamsFiltered = omitBy(
    {
      sortBy:
        typeof queryParams.sortBy === 'string' && sortList.includes(queryParams.sortBy as T)
          ? (queryParams.sortBy as T)
          : undefined,
    },
    isUndefined
  )

  return queryParamsFiltered as Record<'sortBy', T> | undefined
}
