import axios, { AxiosError } from 'axios'
import { HttpStatusCode } from '@/constants/http-status-code'

export function isAxiosError<T>(error: unknown): error is AxiosError<T> {
  return axios.isAxiosError(error)
}

export function isAxiosEntityError<T>(error: unknown): error is AxiosError<T> {
  return isAxiosError(error) && error.response?.status === HttpStatusCode.UnprocessableEntity
}

export function isAxiosUnauthorizedError<T>(error: unknown): error is AxiosError<T> {
  return isAxiosError(error) && error.response?.status === HttpStatusCode.Unauthorized
}

export function isAxiosExpiredTokenError<T>(error: unknown): error is AxiosError<T> {
  return isAxiosUnauthorizedError(error) && (error.response?.data as any).message === 'Jwt expired'
}
