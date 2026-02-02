import { axiosInstance } from './api'

export const appService = {
  login: (data: {
    email: string
    password: string
    language?: string
    type?: string
  }) =>
    axiosInstance.post('auth/sign-in', {
      language: data.language,
      type: data.type,
      credential: data.email,
      email: data.email,
      password: data.password,
    }),

  getUserProfile: () => axiosInstance.get('users/profile'),
}
