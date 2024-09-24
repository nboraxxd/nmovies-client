import { z } from 'zod'

const configSchema = z.object({
  API_ENDPOINT: z.string(),
  NEXT_URL: z.string(),
  REFRESH_TOKEN_CHECK_INTERVAL: z.string(),
})

const configProject = configSchema.safeParse({
  API_ENDPOINT: process.env.NEXT_PUBLIC_API_ENDPOINT,
  NEXT_URL: process.env.NEXT_PUBLIC_URL,
  REFRESH_TOKEN_CHECK_INTERVAL: process.env.NEXT_PUBLIC_REFRESH_TOKEN_CHECK_INTERVAL,
})

if (!configProject.success) {
  throw new Error('Invalid configuration. Please check your .env file.')
}

const envConfig = configProject.data
export default envConfig
