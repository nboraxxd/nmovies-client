import http from '@/utils/http'
import {
  AuthResponseType,
  ChangePasswordBodyType,
  EmailVerifyTokenType,
  LoginBodyType,
  RefreshTokenType,
  RegisterBodyType,
} from '@/lib/schemas/auth.schema'
import { MessageResponseType } from '@/lib/schemas/common.schema'
import envVariables from '@/lib/schemas/env-variables.schema'

export const AUTH_API_URL = '/auth'

export const REGISTER_API_URL = `${AUTH_API_URL}/register`
export const LOGIN_API_URL = `${AUTH_API_URL}/login`
export const VERIFY_EMAIL_API_URL = `${AUTH_API_URL}/verify-email`
export const RESET_PASSWORD_API_URL = `${AUTH_API_URL}/reset-password`
export const REFRESH_TOKEN_API_URL = `${AUTH_API_URL}/refresh-token`
export const LOGOUT_API_URL = `${AUTH_API_URL}/logout`

const authsApi = {
  register: (body: RegisterBodyType) => http.post<AuthResponseType>(REGISTER_API_URL, body),

  resendEmailVerification: () =>
    http.post<MessageResponseType>(`${AUTH_API_URL}/resend-email-verification`, {
      clientUrl: envVariables.VITE_CLIENT_URL,
    }),

  verifyEmail: (body: EmailVerifyTokenType) => http.post<MessageResponseType>(VERIFY_EMAIL_API_URL, body),

  login: (body: LoginBodyType) => http.post<AuthResponseType>(LOGIN_API_URL, body),

  changePassword: (body: ChangePasswordBodyType) =>
    http.patch<MessageResponseType>(`${AUTH_API_URL}/change-password`, body),

  logout: (body: RefreshTokenType) => http.post<MessageResponseType>(LOGOUT_API_URL, body),
}

export default authsApi
