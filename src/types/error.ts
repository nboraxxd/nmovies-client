import { ZodIssueCode } from 'zod'

type ValidationLocation = 'body' | 'params' | 'query' | 'headers'

type ErrorsType = { code: ZodIssueCode; message: string; path: string; location: ValidationLocation }[]

export type ErrorResponse<T> = {
  message: string
  errors?: T
}

export type EntityError = {
  message: string
  errors: ErrorsType
}
