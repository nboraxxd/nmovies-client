import queryString from 'query-string'
import { useNavigate } from 'react-router-dom'

import { RATING_OPTIONS } from '@/constants'
import useFilteredMediaParams from '@/hooks/useFilteredMediaParams'
import { DiscoverMoviesQueryType } from '@/lib/schemas/movies.schema'

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

export default function RatingSelect() {
  const navigate = useNavigate()

  const filteredMediaParams = useFilteredMediaParams<DiscoverMoviesQueryType>()

  const voteGteList = RATING_OPTIONS.map(({ value }) => +value.split('-')[0])
  const voteLteList = RATING_OPTIONS.map(({ value }) => +value.split('-')[1])

  return (
    <Select
      onValueChange={(ev: (typeof RATING_OPTIONS)[number]['value']) => {
        const [voteAverageGte, voteAverageLte] = ev.split('-')
        navigate({ search: queryString.stringify({ ...filteredMediaParams, voteAverageGte, voteAverageLte }) })
      }}
      value={
        filteredMediaParams.voteAverageGte &&
        voteGteList.includes(filteredMediaParams.voteAverageGte) &&
        filteredMediaParams.voteAverageLte &&
        voteLteList.includes(filteredMediaParams.voteAverageLte)
          ? `${filteredMediaParams.voteAverageGte}-${filteredMediaParams.voteAverageLte}`
          : undefined
      }
    >
      <SelectTrigger className="w-28">
        <SelectValue placeholder="Rating" />
      </SelectTrigger>
      <SelectContent align="end">
        {RATING_OPTIONS.map(({ name, value }) => (
          <SelectItem key={value} value={value} className="cursor-pointer">
            {name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
