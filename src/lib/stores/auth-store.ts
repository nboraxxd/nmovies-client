import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { getAccessTokenFromLocalStorage } from '@/utils/local-storage'
import { UserDocumentResponseType } from '@/lib/schemas/profile.schema'

type AuthStore = {
  isAuth: boolean
  setIsAuth: (isAuth: boolean) => void
  profile: UserDocumentResponseType | null
  setProfile: (profile: UserDocumentResponseType | null) => void
}

export const useAuthStore = create<AuthStore>()(
  devtools(
    (set) => ({
      isAuth: Boolean(getAccessTokenFromLocalStorage()),
      setIsAuth: (isAuth) => set({ isAuth }),
      profile: null,
      setProfile: (profile) => set({ profile }),
    }),
    {
      enabled: process.env.NODE_ENV === 'development',
      name: 'authStore',
    }
  )
)
