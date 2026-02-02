import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'

export const axiosInstance = axios.create({
  baseURL: 'https://api.meekula.com',
  timeout: 15000,
})

// A separate axios client without interceptors used for refreshing token
const refreshClient = axios.create({ baseURL: 'https://api.meekula.com' })

let isRefreshing = false
let failedQueue: Array<{
  resolve: (value?: any) => void
  reject: (err: any) => void
}> = []

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) prom.reject(error)
    else prom.resolve(token)
  })

  failedQueue = []
}

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
   handles token refresh
====================== */
axiosInstance.interceptors.response.use(
  (res) => res.data,
  async (err) => {
    const originalRequest = err.config

    const statusCode = err?.response?.data?.statusCode ?? err?.response?.status

    if (statusCode === 401 || statusCode === 'TOKEN_EXPIRED' || statusCode === 'INVALID_TOKEN') {
      try {
        if (isRefreshing) {
          return new Promise((resolve, reject) => {
            failedQueue.push({ resolve, reject })
          })
            .then((token) => {
              originalRequest.headers.Authorization = `Bearer ${token}`
              return axiosInstance(originalRequest)
            })
            .catch((e) => Promise.reject(e))
        }

        isRefreshing = true
        const refreshToken = await AsyncStorage.getItem('refreshToken')

        if (!refreshToken) {
          await AsyncStorage.removeItem('accessToken')
          isRefreshing = false
          return Promise.reject(err)
        }

        const response = await refreshClient.post('/auth/refresh', {
          refreshToken,
        })

        const newAccessToken = response?.data?.data?.accessToken ?? response?.data?.accessToken ?? response?.data
        const newRefreshToken = response?.data?.data?.refreshToken ?? response?.data?.refreshToken

        if (newAccessToken) {
          await AsyncStorage.setItem('accessToken', newAccessToken)
          if (newRefreshToken) await AsyncStorage.setItem('refreshToken', newRefreshToken)

          processQueue(null, newAccessToken)

          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`
          return axiosInstance(originalRequest)
        }

        await AsyncStorage.removeItem('accessToken')
        await AsyncStorage.removeItem('refreshToken')
        processQueue(new Error('Unable to refresh token'), null)
        return Promise.reject(err)
      } catch (refreshErr) {
        processQueue(refreshErr, null)
        await AsyncStorage.removeItem('accessToken')
        await AsyncStorage.removeItem('refreshToken')
        isRefreshing = false
        return Promise.reject(refreshErr)
      } finally {
        isRefreshing = false
      }
    }

    // fallback: if token is invalid remove it
    if (
      ['TOKEN_EXPIRED', 'INVALID_TOKEN'].includes(err?.response?.data?.statusCode)
    ) {
      await AsyncStorage.removeItem('accessToken')
      await AsyncStorage.removeItem('refreshToken')
    }

    return Promise.reject(err)
  }
)

