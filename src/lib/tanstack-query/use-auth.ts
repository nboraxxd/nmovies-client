import { useMutation, useQueryClient } from '@tanstack/react-query'

import authsApi from '@/apis/auths.api'
import { QUERY_KEY } from '@/constants/tanstack-key'
import { useAuthStore } from '@/lib/stores/auth-store'

export function useRegister() {
  const queryClient = useQueryClient()
  const setIsAuth = useAuthStore((state) => state.setIsAuth)

  return useMutation({
    mutationFn: authsApi.register,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.PROFILE] })
      setIsAuth(true)
    },
  })
}

export function useResendEmailVerification() {
  return useMutation({ mutationFn: authsApi.resendEmailVerification })
}

export function useVerifyEmail() {
  const queryClient = useQueryClient()
  const setIsAuth = useAuthStore((state) => state.setIsAuth)

  return useMutation({
    mutationFn: authsApi.verifyEmail,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.PROFILE] })
      setIsAuth(true)
    },
  })
}

export function useLogin() {
  const queryClient = useQueryClient()
  const setIsAuth = useAuthStore((state) => state.setIsAuth)

  return useMutation({
    mutationFn: authsApi.login,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.PROFILE] })
      setIsAuth(true)
    },
  })
}

export function useChangePassword() {
  return useMutation({ mutationFn: authsApi.changePassword })
}

export function useLogout() {
  return useMutation({ mutationFn: authsApi.logout })
}
