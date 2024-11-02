import { useEffect } from 'react'

import { useAuthStore } from '@/lib/stores/auth-store'
import { localStorageEventTarget, REMOVE_TOKENS_EVENT } from '@/utils/local-storage'

export default function AuthCleanup() {
  const setIsAuth = useAuthStore((state) => state.setIsAuth)
  const setProfile = useAuthStore((state) => state.setProfile)

  useEffect(() => {
    const handleRemoveAuth = () => {
      setIsAuth(false)
      setProfile(null)
    }

    localStorageEventTarget.addEventListener(REMOVE_TOKENS_EVENT, handleRemoveAuth)

    return () => {
      localStorageEventTarget.removeEventListener(REMOVE_TOKENS_EVENT, handleRemoveAuth)
    }
  }, [setIsAuth, setProfile])

  return null
}
