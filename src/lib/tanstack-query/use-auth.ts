import { useMutation } from '@tanstack/react-query'

import authsApi from '@/apis/auths.api'

export function useRegister() {
  return useMutation({ mutationFn: authsApi.register })
}

export function useLogin() {
  return useMutation({ mutationFn: authsApi.login })
}
