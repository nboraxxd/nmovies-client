import { z } from 'zod'

const envSchema = z.object({
  VITE_SERVER_API: z.string(),
  VITE_CLIENT_URL: z.string(),
})

const envProject = envSchema.safeParse({
  VITE_SERVER_API: import.meta.env.VITE_SERVER_API,
  VITE_CLIENT_URL: import.meta.env.VITE_CLIENT_URL,
})

if (!envProject.success) {
  throw new Error('Invalid configuration. Please check your .env file.')
}

const envVariables = envProject.data

export default envVariables
