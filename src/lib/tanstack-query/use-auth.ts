import { useMutation } from '@tanstack/react-query'

import authsApi from '@/apis/auths.api'
import { useAuthStore } from '@/lib/stores/auth-store'

export function useRegister() {
  const setIsAuth = useAuthStore((state) => state.setIsAuth)

  return useMutation({
    mutationFn: authsApi.register,
    onSuccess: () => setIsAuth(true),
  })
}

export function useResendEmailVerification() {
  return useMutation({ mutationFn: authsApi.resendEmailVerification })
}

export function useVerifyEmail() {
  const setIsAuth = useAuthStore((state) => state.setIsAuth)

  return useMutation({
    mutationFn: authsApi.verifyEmail,
    onSuccess: () => setIsAuth(true),
  })
}

export function useLogin() {
  const setIsAuth = useAuthStore((state) => state.setIsAuth)

  return useMutation({
    mutationFn: authsApi.login,
    onSuccess: () => setIsAuth(true),
  })
}

export function useChangePassword() {
  return useMutation({ mutationFn: authsApi.changePassword })
}

export function useLogout() {
  return useMutation({ mutationFn: authsApi.logout })
}

export function useForgotPasswordMutation() {
  return useMutation({ mutationFn: authsApi.forgotPassword })
}

export function useResetPasswordMutation() {
  return useMutation({ mutationFn: authsApi.resetPassword })
}
