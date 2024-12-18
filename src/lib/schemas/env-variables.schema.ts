import { z } from 'zod'

const envSchema = z.object({
  VITE_SERVER_API: z.string(),
  VITE_CLIENT_URL: z.string(),
  VITE_REVIEWS_PER_PAGE_LIMIT: z.coerce.number().int(),
  VITE_FAVORITES_PER_PAGE_LIMIT: z.coerce.number().int(),
})

const envProject = envSchema.safeParse({
  VITE_SERVER_API: import.meta.env.VITE_SERVER_API,
  VITE_CLIENT_URL: import.meta.env.VITE_CLIENT_URL,
  VITE_REVIEWS_PER_PAGE_LIMIT: import.meta.env.VITE_REVIEWS_PER_PAGE_LIMIT,
  VITE_FAVORITES_PER_PAGE_LIMIT: import.meta.env.VITE_FAVORITES_PER_PAGE_LIMIT,
})

if (!envProject.success) {
  throw new Error('Invalid configuration. Please check your .env file.')
}

const envVariables = envProject.data

export default envVariables
