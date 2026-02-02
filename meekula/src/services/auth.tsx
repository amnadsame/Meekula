import React, { createContext, useContext, useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { appService } from './appService'

type AuthContextType = {
  isAuthenticated: boolean
  loading: boolean
  authProcessing: boolean
  login: (payload: { email: string; password: string }) => Promise<void>
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)
  const [authProcessing, setAuthProcessing] = useState(false)

  useEffect(() => {
    const check = async () => {
      const token = await AsyncStorage.getItem('accessToken')
      setIsAuthenticated(!!token)
      setLoading(false)
    }

    check()
  }, [])

  const login = async ({ email, password }: { email: string; password: string }) => {
    try {
      const res = await appService.login({ email, password, language: 'en', type: 'APP' })

      // API can return many shapes; normalize into payload
      const payload = res?.data ?? res ?? {}

      // Try common locations for tokens
      const accessToken =
        payload?.accessToken ??
        payload?.token ??
        payload?.access_token ??
        payload?.data?.accessToken ??
        payload?.result?.accessToken ??
        payload?.result?.token

      const refreshToken =
        payload?.refreshToken ?? payload?.data?.refreshToken ?? payload?.result?.refreshToken

      if (!accessToken) {
        console.error('Login response missing token', { payload })
        throw new Error('Missing access token from login response')
      }

      await AsyncStorage.setItem('accessToken', accessToken)
      if (refreshToken) await AsyncStorage.setItem('refreshToken', refreshToken)

      // post-login processing: fetch profile and show loading overlay in UI
      setAuthProcessing(true)
      const start = Date.now()
      try {
        const profileRes = await appService.getUserProfile()
        const profile = profileRes?.data ?? profileRes ?? {}
        await AsyncStorage.setItem('userProfile', JSON.stringify(profile))
      } catch (e) {
        console.warn('Failed to fetch profile after login', e)
      } finally {
        const elapsed = Date.now() - start
        const MIN_MS = 5000 // minimum 10 seconds loading
        if (elapsed < MIN_MS) {
          await new Promise((r) => setTimeout(r, MIN_MS - elapsed))
        }
        setAuthProcessing(false)
      }

      setIsAuthenticated(true)
    } catch (e) {
      console.error('Auth.login error', e)
      throw e
    }
  }

  const logout = async () => {
    await AsyncStorage.removeItem('accessToken')
    await AsyncStorage.removeItem('refreshToken')
    setIsAuthenticated(false)
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, loading, authProcessing, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}