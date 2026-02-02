import { axiosInstance } from './api'
import axios from 'axios'

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

  refreshToken: (refreshToken: string) =>
    axios.post('https://api.meekula.com/auth/refresh', {
      refreshToken,
    }),

  getUserProfile: () => axiosInstance.get('users/profile'),
}
