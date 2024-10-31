import { ZodIssueCode } from 'zod'

type ValidationLocation = 'body' | 'params' | 'query' | 'headers'

type ErrorsType = { code: ZodIssueCode; message: string; path: string; location: ValidationLocation }[]

export type EntityError = {
  message: string
  errors: ErrorsType
}

export type UnauthorizedError = {
  message: string
  errorInfo: {
    code: string
    message: string
    name: string
  }
}
