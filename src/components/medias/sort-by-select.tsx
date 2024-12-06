import queryString from 'query-string'
import { useLocation, useNavigate } from 'react-router-dom'

import { MOVIE_SORT_OPTIONS, TV_SORT_OPTIONS } from '@/constants'
import { DiscoverTvsQueryType } from '@/lib/schemas/tv.schema'
import { DiscoverMoviesQueryType } from '@/lib/schemas/movies.schema'
import useFilteredMediaParams from '@/hooks/use-filtered-media-params'

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

export default function SortBySelect() {
  const navigate = useNavigate()
  const { pathname } = useLocation()

  const filteredMediaParams = useFilteredMediaParams<DiscoverMoviesQueryType | DiscoverTvsQueryType>()

  const sortOptions = pathname === '/movies' ? MOVIE_SORT_OPTIONS : TV_SORT_OPTIONS

  return (
    <Select
      onValueChange={(ev) => {
        navigate({ search: queryString.stringify({ ...filteredMediaParams, sortBy: ev }) })
      }}
      value={filteredMediaParams?.sortBy}
    >
      <SelectTrigger className="w-52" value={filteredMediaParams.sortBy}>
        <SelectValue placeholder="Sort by" />
      </SelectTrigger>
      <SelectContent align="end">
        {sortOptions.map(({ name, value }) => (
          <SelectItem key={value} value={value} className="cursor-pointer">
            {name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
