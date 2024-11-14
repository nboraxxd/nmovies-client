import z from 'zod'
import { paginationResponseSchema, queryPageSchema } from '@/lib/schemas/common.schema'
import {
  genreSchema,
  productionCompanySchema,
  productionCountrySchema,
  spokenLanguageSchema,
  videoSchema,
} from '@/lib/schemas/common-media.schema'
import { tvDataSchema } from '@/lib/schemas/tv.schema'

/* Common schema */
export const movieCastSchema = z.object({
  adult: z.boolean(),
  gender: z.number().nullable(),
  id: z.number(),
  knownForDepartment: z.string(),
  name: z.string(),
  originalName: z.string(),
  popularity: z.number(),
  profilePath: z.string().nullable(),
  castId: z.number(),
  character: z.string(),
  creditId: z.string(),
  order: z.number(),
})

export type MovieCastType = z.TypeOf<typeof movieCastSchema>

export const movieCrewSchema = z.object({
  adult: z.boolean(),
  gender: z.number().nullable(),
  id: z.number(),
  knownForDepartment: z.string(),
  name: z.string(),
  originalName: z.string(),
  popularity: z.number(),
  profilePath: z.string().nullable(),
  creditId: z.string(),
  department: z.string(),
  job: z.string(),
})

export type MovieCrewType = z.TypeOf<typeof movieCrewSchema>

export const movieDataSchema = z.object({
  adult: z.boolean(),
  backdropPath: z.string().nullable(),
  genreIds: z.array(z.number()),
  id: z.number(),
  mediaType: z.literal('movie'),
  originalLanguage: z.string(),
  originalTitle: z.string(),
  overview: z.string(),
  popularity: z.number(),
  posterPath: z.string().nullable(),
  releaseDate: z.string(),
  title: z.string(),
  video: z.boolean(),
  voteAverage: z.number(),
  voteCount: z.number(),
  isFavorite: z.boolean().nullable(),
})

export type MovieDataType = z.TypeOf<typeof movieDataSchema>

export const movieDetailDataSchema = movieDataSchema
  .omit({ mediaType: true, genreIds: true, isFavorite: true })
  .extend({
    belongsToCollection: z
      .object({
        id: z.number(),
        name: z.string(),
        posterPath: z.string().nullable(),
        backdropPath: z.string().nullable(),
      })
      .nullable(),
    budget: z.number(),
    genres: z.array(genreSchema),
    homepage: z.string().nullable(),
    imdbId: z.string().nullable(),
    originCountry: z.array(z.string()),
    productionCompanies: z.array(productionCompanySchema),
    productionCountries: z.array(productionCountrySchema),
    revenue: z.number(),
    runtime: z.number().nullable(),
    spokenLanguages: z.array(spokenLanguageSchema),
    status: z.string(),
    tagline: z.string().nullable(),
    videos: z.object({
      results: z.array(videoSchema),
    }),
    certification: z.string().nullable(),
  })

export type MovieDetailDataType = z.TypeOf<typeof movieDetailDataSchema>

/* Discover movies schema */
export const movieSortOptionsSchema = z.enum(
  [
    'original_title.asc',
    'original_title.desc',
    'popularity.asc',
    'popularity.desc',
    'revenue.asc',
    'revenue.desc',
    'primary_release_date.asc',
    'primary_release_date.desc',
    'title.asc',
    'title.desc',
    'vote_average.asc',
    'vote_average.desc',
    'vote_count.asc',
    'vote_count.desc',
  ],
  { message: 'Invalid sort by value' }
)

export type MovieSortOptionsType = z.TypeOf<typeof movieSortOptionsSchema>

export const discoverMoviesQuerySchema = z
  .object({
    includeAdult: z.coerce
      .number()
      .refine((value) => value === 0 || value === 1, { message: 'includeAdult must be 0 (false) or 1 (true)' })
      .optional(),
    includeVideo: z.coerce
      .number()
      .refine((value) => value === 0 || value === 1, { message: 'includeVideo must be 0 (false) or 1 (true)' })
      .optional(),
    page: queryPageSchema.optional(),
    sortBy: movieSortOptionsSchema.optional(),
    voteAverageGte: z.coerce.number().optional(),
    voteAverageLte: z.coerce.number().optional(),
    withGenres: z
      .string()
      .regex(/^(\d+)(,\d+)*$/, { message: 'withGenres must be a list of genre IDs separated by commas' })
      .optional(),
  })
  .strict({ message: 'Additional properties not allowed' })

export type DiscoverMoviesQueryType = z.TypeOf<typeof discoverMoviesQuerySchema>

export const discoverMoviesResponseSchema = z.object({
  message: z.string(),
  data: z.array(movieDataSchema),
  pagination: paginationResponseSchema,
})

export type DiscoverMoviesResponseType = z.TypeOf<typeof discoverMoviesResponseSchema>

/* Top rated movies schema */
export const topRatedMoviesResponseSchema = discoverMoviesResponseSchema

export type TopRatedMoviesResponseType = z.TypeOf<typeof topRatedMoviesResponseSchema>

/* Search movies schema */
export const searchMoviesResponseSchema = discoverMoviesResponseSchema

export type SearchMoviesResponseType = z.TypeOf<typeof searchMoviesResponseSchema>

/* Movie detail schema */
export const movieIdParamsSchema = z.object({
  movieId: z.coerce.number({ message: 'Movie ID must be a number' }).int({ message: 'Movie ID must be an integer' }),
})

export type MovieIdParamsType = z.TypeOf<typeof movieIdParamsSchema>

export const movieDetailResponseSchema = z.object({
  message: z.string(),
  data: movieDetailDataSchema,
})

export type MovieDetailResponseType = z.TypeOf<typeof movieDetailResponseSchema>

/* Movie credits schema */
export const movieCreditsResponseSchema = z.object({
  message: z.string(),
  data: z.object({
    cast: z.array(movieCastSchema),
    crew: z.array(movieCrewSchema),
  }),
})

export type MovieCreditsResponseType = z.TypeOf<typeof movieCreditsResponseSchema>

/* Recommended movies schema */
export const recommendedMoviesResponseSchema = z.object({
  message: z.string(),
  data: z.array(z.union([movieDataSchema, tvDataSchema])),
  pagination: paginationResponseSchema,
})

export type RecommendedMoviesResponseType = z.TypeOf<typeof recommendedMoviesResponseSchema>

/* Genres movie schema */
export const genresMovieResponseSchema = z.object({
  message: z.string(),
  data: z.array(genreSchema),
})

export type GenresMovieResponseType = z.TypeOf<typeof genresMovieResponseSchema>
