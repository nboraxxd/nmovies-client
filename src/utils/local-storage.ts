import { UserDocumentResponseType } from '@/lib/schemas/profile.schema'

const ACCESS_TOKEN = 'accessToken'
const REFRESH_TOKEN = 'refreshToken'
const PROFILE = 'profile'

export const setAccessTokenToLocalStorage = (accessToken: string) => localStorage.setItem(ACCESS_TOKEN, accessToken)

export const getAccessTokenFromLocalStorage = () => localStorage.getItem(ACCESS_TOKEN)

export const setRefreshTokenToLocalStorage = (refreshToken: string) => localStorage.setItem(REFRESH_TOKEN, refreshToken)

export const getRefreshTokenFromLocalStorage = () => localStorage.getItem(REFRESH_TOKEN)

export const setProfileToLocalStorage = (profile: UserDocumentResponseType) =>
  localStorage.setItem(PROFILE, JSON.stringify(profile))

export const getProfileFromLocalStorage = () => {
  const profile = localStorage.getItem(PROFILE)
  return profile ? (JSON.parse(profile) as UserDocumentResponseType) : null
}

export const removeTokensFromLocalStorage = () => {
  localStorage.removeItem(ACCESS_TOKEN)
  localStorage.removeItem(REFRESH_TOKEN)
}
