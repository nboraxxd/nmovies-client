import { toast } from 'sonner'
import axios, { AxiosError, AxiosInstance } from 'axios'

import { HttpStatusCode } from '@/constants/http-status-code'
import envVariables from '@/lib/schemas/env-variables.schema'
import { AuthResponseType } from '@/lib/schemas/auth.schema'
import {
  getAccessTokenFromLocalStorage,
  getRefreshTokenFromLocalStorage,
  removeTokensFromLocalStorage,
  setAccessTokenToLocalStorage,
  setRefreshTokenToLocalStorage,
} from '@/utils/local-storage'
import {
  LOGIN_API_URL,
  LOGOUT_API_URL,
  REFRESH_TOKEN_API_URL,
  REGISTER_API_URL,
  RESET_PASSWORD_API_URL,
  VERIFY_EMAIL_API_URL,
} from '@/apis/auths.api'
import { isAxiosExpiredTokenError, isAxiosUnauthorizedError } from '@/utils/error'
import { UnauthorizedError } from '@/types/error'

class Http {
  instance: AxiosInstance
  private accessToken: string | null
  private refreshToken: string | null
  private refreshTokenRequest: Promise<string> | null

  private async handleRefreshToken() {
    try {
      const res = await this.instance.post<AuthResponseType>(REFRESH_TOKEN_API_URL, {
        refreshToken: this.refreshToken,
      })

      const { accessToken, refreshToken } = res.data

      this.accessToken = accessToken
      this.refreshToken = refreshToken
      setAccessTokenToLocalStorage(accessToken)
      setRefreshTokenToLocalStorage(refreshToken)

      return accessToken
    } catch (error) {
      this.accessToken = null
      this.refreshToken = null

      removeTokensFromLocalStorage()

      throw error
    }
  }

  constructor() {
    this.instance = axios.create({
      baseURL: envVariables.VITE_SERVER_API,
      headers: {
        'Content-Type': 'application/json',
      },
    })
    this.accessToken = getAccessTokenFromLocalStorage()
    this.refreshToken = getRefreshTokenFromLocalStorage()
    this.refreshTokenRequest = null

    this.instance.interceptors.request.use(
      (config) => {
        if (config.headers && this.accessToken) {
          config.headers.authorization = `Bearer ${this.accessToken}`
        }
        return config
      },
      (error) => Promise.reject(error)
    )

    this.instance.interceptors.response.use(
      (response) => {
        const { url } = response.config
        if (url && [LOGIN_API_URL, REGISTER_API_URL, VERIFY_EMAIL_API_URL].some((item) => item.startsWith(url))) {
          this.accessToken = (response.data as AuthResponseType).data.accessToken
          this.refreshToken = (response.data as AuthResponseType).data.refreshToken

          setAccessTokenToLocalStorage(this.accessToken)
          setRefreshTokenToLocalStorage(this.refreshToken)
        } else if (url === LOGOUT_API_URL) {
          this.accessToken = null
          this.refreshToken = null
          removeTokensFromLocalStorage()
        }

        return response.data
      },
      async (error: AxiosError) => {
        if (!(error.status === HttpStatusCode.Unauthorized) && !(error.status === HttpStatusCode.UnprocessableEntity)) {
          const data: any | undefined = error.response?.data
          const message =
            data?.errorInfo?.map((item: any) => item.message)?.join(', ') || data?.message || error.message
          toast.error(message)
        }

        const config = error.response?.config
        const url = config?.url

        if (
          url &&
          isAxiosUnauthorizedError<UnauthorizedError>(error) &&
          ![VERIFY_EMAIL_API_URL, RESET_PASSWORD_API_URL].some((item) => url.startsWith(item))
        ) {
          if (
            isAxiosExpiredTokenError<UnauthorizedError>(error) &&
            ![REFRESH_TOKEN_API_URL, LOGOUT_API_URL].some((item) => url.startsWith(item))
          ) {
            this.refreshTokenRequest = this.refreshTokenRequest
              ? this.refreshTokenRequest
              : this.handleRefreshToken().finally(() => {
                  setTimeout(() => {
                    this.refreshTokenRequest = null
                  }, 10000)
                })

            const accessToken = await this.refreshTokenRequest

            return this.instance({
              ...config,
              headers: { ...config?.headers, authorization: `Bearer ${accessToken}` },
            })
          }

          removeTokensFromLocalStorage()
          this.accessToken = null
          this.refreshToken = null
          toast.error(
            error.response?.data.message === 'Jwt expired'
              ? 'Session expired. Please log in again.'
              : error.response?.data.message || error.message
          )
        }

        return Promise.reject(error)
      }
    )
  }
}

const http = new Http().instance
export default http
