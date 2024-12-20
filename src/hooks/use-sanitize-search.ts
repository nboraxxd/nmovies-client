import omitBy from 'lodash/omitBy'
import queryString from 'query-string'
import isUndefined from 'lodash/isUndefined'
import { useLocation } from 'react-router-dom'

import { SEARCH_TAB_LIST } from '@/constants'
import { SearchType } from '@/lib/schemas/search.schema'
import { SearchQueryType } from '@/lib/schemas/common-media.schema'

export default function useSanitizeSearch() {
  const { search } = useLocation()
  const queryParams = queryString.parse(search)

  const sanitizeSearch = omitBy(
    {
      query: typeof queryParams.query === 'string' && queryParams.query.length > 0 ? queryParams.query : undefined,
      type:
        typeof queryParams.type === 'string' &&
        SEARCH_TAB_LIST.includes(queryParams.type as Exclude<SearchType['type'], undefined>)
          ? queryParams.type
          : undefined,
      page: Number(queryParams.page) ? Number(queryParams.page) : undefined,
    },
    isUndefined
  ) as SearchQueryType & { type?: SearchType['type'] }

  return sanitizeSearch
}
