import http from '@/utils/http'
import { AuthResponseType, ChangePasswordBodyType, LoginBodyType, RegisterBodyType } from '@/lib/schemas/auth.schema'
import { MessageResponseType } from '@/lib/schemas/common.schema'

export const AUTH_API_URL = '/auth'

export const REGISTER_API_URL = `${AUTH_API_URL}/register`
export const LOGIN_API_URL = `${AUTH_API_URL}/login`
export const LOGIN_BY_CODE_API_URL = `${AUTH_API_URL}/login-by-code`
export const REFRESH_TOKEN_API_URL = `${AUTH_API_URL}/refresh-token`
export const LOGOUT_API_URL = `${AUTH_API_URL}/logout`

const authsApi = {
  register: (body: RegisterBodyType) => http.post<AuthResponseType>(REGISTER_API_URL, body),

  login: (body: LoginBodyType) => http.post<AuthResponseType>(LOGIN_API_URL, body),

  changePassword: (body: ChangePasswordBodyType) =>
    http.patch<MessageResponseType>(`${AUTH_API_URL}/change-password`, body),
}

export default authsApi
