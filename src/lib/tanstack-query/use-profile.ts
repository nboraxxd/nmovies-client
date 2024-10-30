import profileApi from '@/apis/profile.api'
import { UpdateProfileResponseType } from '@/lib/schemas/profile.schema'
import { useMutation, useQuery } from '@tanstack/react-query'

export function useGetProfileQuery(payload?: {
  enabled?: boolean
  onSuccess?: (data: UpdateProfileResponseType['data']) => void
}) {
  return useQuery({
    queryFn: () =>
      profileApi.getProfile().then((res) => {
        if (payload?.onSuccess) {
          payload.onSuccess(res.data)
        }

        return res
      }),
    queryKey: ['profile'],
    enabled: payload?.enabled ?? true,
  })
}

export function useUploadAvatarMutation() {
  return useMutation({
    mutationFn: profileApi.uploadAvatar,
  })
}

export function useUpdateProfileMutation() {
  const getProfileQuery = useGetProfileQuery({ enabled: false })

  return useMutation({
    mutationFn: profileApi.updateProfile,
    onSuccess: () => getProfileQuery.refetch(),
  })
}
