import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { BASE_API_URL } from '../config'
import { showSuccess, showError } from '../utils/toast'

export const axiosInstance = axios.create({
  baseURL: BASE_API_URL,
  timeout: 15000,
})

// A separate axios client without interceptors used for refreshing token
const refreshClient = axios.create({ baseURL: BASE_API_URL })

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
   handles token refresh + show messages
====================== */
axiosInstance.interceptors.response.use(
  (res) => {
    // res is full axios response here
    const message = res?.data?.message ?? res?.data?.data?.message ?? res?.data?.result?.message

    if (message && message !== 'Success') {
      // skip some endpoints that web client excludes
      const excluded = ['app/send-email', 'app/email-auth', 'auth/sign-up']
      if (!excluded.some((u) => (res?.config?.url ?? '').includes(u))) {
        try {
          showSuccess(String(message))
        } catch (e) {
          console.log('[api] showSuccess failed', e)
        }
      }
    }

    return res.data
  },
  async (err) => {
    try {
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

      // map message
      let message = err?.response?.data?.message
      if (message) {
        if (message === 'Bad Request') message = err?.response?.data?.errors?.[0]?.msg ?? message
      } else {
        message = err?.message ?? String(err)
      }

      try {
        showError(message)
      } catch (e) {
        console.log('[api] showError failed', e)
      }
    } catch (e) {
      console.log('[api] interceptor unexpected error', e)
    }

    return Promise.reject(err)
  }
)

