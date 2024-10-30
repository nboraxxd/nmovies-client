import http from '@/utils/http'
import {
  GetProfileResponseType,
  UpdateProfileBodyType,
  UpdateProfileResponseType,
  UploadAvatarResponseType,
} from '@/lib/schemas/profile.schema'

const profileApi = {
  getProfile: async () => {
    return http.get<GetProfileResponseType>('/profile')
  },

  uploadAvatar: async (avatar: FormData) => {
    return http.post<UploadAvatarResponseType>('/profile/upload-avatar', avatar, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
  },

  updateProfile: async (payload: UpdateProfileBodyType) => {
    return http.patch<UpdateProfileResponseType>('/profile', payload)
  },
}

export default profileApi
