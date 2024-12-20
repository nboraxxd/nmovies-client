import { PaginationResponseType } from '@/lib/schemas/common.schema'
import { MovieDataType } from '@/lib/schemas/movies.schema'
import { PersonDataType } from '@/lib/schemas/people.schema'
import { TVDataType } from '@/lib/schemas/tv.schema'
import { z } from 'zod'

export const searchSchema = z
  .object({
    query: z.string().optional(),
    type: z.enum(['movie', 'tv', 'person']),
  })
  .strict({ message: 'Additional properties not allowed' })

export type SearchType = z.TypeOf<typeof searchSchema>

export type SearchResponseType = {
  message: string
  data: Array<MovieDataType | TVDataType | PersonDataType>
  pagination: PaginationResponseType
}
