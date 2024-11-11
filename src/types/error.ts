import { ZodIssueCode } from 'zod'

export type ValidationLocation = 'body' | 'params' | 'query' | 'headers' | 'file'

type ErrorsType = { code: ZodIssueCode; message: string; path: string; location: ValidationLocation }[]

export type EntityError = {
  message: string
  errors: ErrorsType
}

export type UnauthorizedError = {
  message: string
  errorInfo?: Record<string, any>
  location?: ValidationLocation
}
