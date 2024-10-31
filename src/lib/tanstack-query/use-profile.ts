import { useMutation, useQuery } from '@tanstack/react-query'

import profileApi from '@/apis/profile.api'
import { useAuthStore } from '@/lib/stores/auth-store'
import { useEffect } from 'react'

export function useProfileQuery(payload?: { enabled?: boolean }) {
  const setIsAuth = useAuthStore((state) => state.setIsAuth)
  const setProfile = useAuthStore((state) => state.setProfile)

  const getProfileQuery = useQuery({
    queryFn: profileApi.getProfile,
    queryKey: ['profile'],
    enabled: payload?.enabled ?? true,
  })

  useEffect(() => {
    if (getProfileQuery.isSuccess) {
      setIsAuth(true)
      setProfile(getProfileQuery.data.data)
    }
  }, [getProfileQuery.data?.data, getProfileQuery.isSuccess, setIsAuth, setProfile])

  return getProfileQuery
}

export function useUploadAvatarMutation() {
  return useMutation({
    mutationFn: profileApi.uploadAvatar,
  })
}

export function useUpdateProfileMutation() {
  const getProfileQuery = useProfileQuery({ enabled: false })

  return useMutation({
    mutationFn: profileApi.updateProfile,
    onSuccess: () => getProfileQuery.refetch(),
  })
}
