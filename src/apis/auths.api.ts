import http from '@/utils/http'

export const AUTH_API_URL = '/auth'
export const LOGIN_API_URL = `${AUTH_API_URL}/login-test`
export const LOGIN_BY_CODE_API_URL = `${AUTH_API_URL}/login-by-code`
export const REFRESH_TOKEN_API_URL = `${AUTH_API_URL}/refresh-token`
export const LOGOUT_API_URL = `${AUTH_API_URL}/logout`

const authsApi = {
  login: (body: string) => http.post(LOGIN_API_URL, body),
}

export default authsApi
