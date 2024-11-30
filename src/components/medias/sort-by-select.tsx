import queryString from 'query-string'
import { useNavigate } from 'react-router-dom'

import { MOVIE_SORT_OPTIONS } from '@/constants'
import useFilteredMediaParams from '@/hooks/useFilteredMediaParams'
import { DiscoverMoviesQueryType, MovieSortOptionsType } from '@/lib/schemas/movies.schema'

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

export default function SortBySelect() {
  const navigate = useNavigate()

  const filteredMediaParams = useFilteredMediaParams<DiscoverMoviesQueryType>()

  return (
    <Select
      onValueChange={(ev: MovieSortOptionsType) => {
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
