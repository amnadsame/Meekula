import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'

export const axiosInstance = axios.create({
  baseURL: 'https://api.meekula.com', 
  timeout: 15000,
})

/* ======================
   REQUEST INTERCEPTOR
====================== */
axiosInstance.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem('accessToken')

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

/* ======================
   RESPONSE INTERCEPTOR
====================== */
axiosInstance.interceptors.response.use(
  (res) => res.data,
  async (err) => {
    if (
      ['TOKEN_EXPIRED', 'INVALID_TOKEN'].includes(
        err?.response?.data?.statusCode
      )
    ) {
      await AsyncStorage.removeItem('accessToken')
    }

    return Promise.reject(err)
  }
)
