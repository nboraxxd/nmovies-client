import { useEffect } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import profileApi from '@/apis/profile.api'
import { useAuthStore } from '@/lib/stores/auth-store'
import { QUERY_KEY } from '@/constants/tanstack-key'

export function useGetProfileQuery() {
  const setProfile = useAuthStore((state) => state.setProfile)

  const getProfileQuery = useQuery({
    queryFn: profileApi.getProfile,
    queryKey: [QUERY_KEY.PROFILE],
  })

  useEffect(() => {
    if (getProfileQuery.isSuccess) {
      setProfile(getProfileQuery.data.data)
    }
  }, [getProfileQuery.data?.data, getProfileQuery.isSuccess, setProfile])

  return getProfileQuery
}

export function useUploadAvatarMutation() {
  return useMutation({
    mutationFn: profileApi.uploadAvatar,
  })
}

export function useUpdateProfileMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: profileApi.updateProfile,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [QUERY_KEY.PROFILE] }),
  })
}
