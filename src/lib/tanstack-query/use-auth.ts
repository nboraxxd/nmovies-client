import { useMutation } from '@tanstack/react-query'

import authsApi from '@/apis/auths.api'
import { useGetProfileQuery } from '@/lib/tanstack-query/use-profile'

export function useRegister() {
  const getProfileQuery = useGetProfileQuery({ enabled: false })

  return useMutation({
    mutationFn: authsApi.register,
    onSuccess: () => getProfileQuery.refetch(),
  })
}

export function useLogin() {
  const getProfileQuery = useGetProfileQuery({ enabled: false })

  return useMutation({ mutationFn: authsApi.login, onSuccess: () => getProfileQuery.refetch() })
}

export function useChangePassword() {
  return useMutation({ mutationFn: authsApi.changePassword })
}
