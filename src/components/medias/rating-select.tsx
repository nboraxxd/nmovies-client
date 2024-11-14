import { RATING_OPTIONS } from '@/constants'

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

export default function RatingSelect() {
  return (
    <Select>
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
