import z from 'zod'
import { tvDataSchema } from '@/lib/schemas/tv.schema'
import { movieDataSchema } from '@/lib/schemas/movies.schema'
import { paginationResponseSchema } from '@/lib/schemas/common.schema'

/* Trending schema */
export const trendingParamsSchema = z
  .object({
    trendingType: z.enum(['all', 'movie', 'tv'], { message: 'Media type must be all, movie or tv' }),
    timeWindow: z.enum(['day', 'week'], { message: 'Time window must be day or week' }).default('day'),
  })
  .strict({ message: 'Additional properties not allowed' })

export type TrendingParamsType = z.TypeOf<typeof trendingParamsSchema>

export const trendingResponseSchema = z.object({
  message: z.string(),
  data: z.array(z.union([movieDataSchema, tvDataSchema])),
  pagination: paginationResponseSchema,
})

export type TrendingResponseType = z.TypeOf<typeof trendingResponseSchema>
