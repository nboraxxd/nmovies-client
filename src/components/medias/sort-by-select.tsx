import { MOVIE_SORT_LIST, MOVIE_SORT_OPTIONS } from '@/constants'

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import useFilteredMediaParams from '@/hooks/useQueryParamsFiltered'
import { useNavigate } from 'react-router-dom'
import { MovieSort } from '@/types'
import queryString from 'query-string'

export default function SortBySelect() {
  const navigate = useNavigate()

  const filteredMediaParams = useFilteredMediaParams(MOVIE_SORT_LIST)

  return (
    <Select
      onValueChange={(ev: MovieSort) => {
        navigate({ search: queryString.stringify({ ...filteredMediaParams, sortBy: ev }) })
      }}
      value={filteredMediaParams?.sortBy}
    >
      <SelectTrigger className="w-52" value={filteredMediaParams?.sortBy}>
        <SelectValue placeholder="Sort by" />
      </SelectTrigger>
      <SelectContent align="end">
        {MOVIE_SORT_OPTIONS.map(({ name, value }) => (
          <SelectItem key={value} value={value} className="cursor-pointer">
            {name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
