import axios, { AxiosError, AxiosInstance } from 'axios'

import envVariables from '@/lib/schemas/env-variables.schema'
import {
  getAccessTokenFromLocalStorage,
  getRefreshTokenFromLocalStorage,
  removeTokensFromLocalStorage,
  setAccessTokenToLocalStorage,
  setRefreshTokenToLocalStorage,
} from '@/utils/local-storage'
import { LOGIN_API_URL, LOGOUT_API_URL, REGISTER_API_URL } from '@/apis/auths.api'
import { AuthResponseType } from '@/lib/schemas/auth.schema'

class Http {
  instance: AxiosInstance
  private accessToken: string | null
  private refreshToken: string | null
  // private refreshTokenRequest: Promise<string> | null

  constructor() {
    this.instance = axios.create({
      baseURL: envVariables.VITE_SERVER_API,
      headers: {
        'Content-Type': 'application/json',
      },
    })
    this.accessToken = getAccessTokenFromLocalStorage()
    this.refreshToken = getRefreshTokenFromLocalStorage()
    // this.refreshTokenRequest = null

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
        if (url === LOGIN_API_URL || url === REGISTER_API_URL) {
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
      (error: AxiosError) => Promise.reject(error)
    )
  }
}

const http = new Http().instance
export default http
