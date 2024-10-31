import { useMutation } from '@tanstack/react-query'

import authsApi from '@/apis/auths.api'
import { useProfileQuery } from '@/lib/tanstack-query/use-profile'

export function useRegister() {
  const getProfileQuery = useProfileQuery({ enabled: false })

  return useMutation({
    mutationFn: authsApi.register,
    onSuccess: () => getProfileQuery.refetch(),
  })
}

export function useResendEmailVerification() {
  return useMutation({ mutationFn: authsApi.resendEmailVerification })
}

export function useVerifyEmail() {
  const getProfileQuery = useProfileQuery({ enabled: false })

  return useMutation({ mutationFn: authsApi.verifyEmail, onSuccess: () => getProfileQuery.refetch() })
}

export function useLogin() {
  const getProfileQuery = useProfileQuery({ enabled: false })

  return useMutation({ mutationFn: authsApi.login, onSuccess: () => getProfileQuery.refetch() })
}

export function useChangePassword() {
  return useMutation({ mutationFn: authsApi.changePassword })
}
