import React, { createContext, useContext, useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { appService } from './appService'

type AuthContextType = {
  isAuthenticated: boolean
  loading: boolean
  login: (payload: { email: string; password: string }) => Promise<void>
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const check = async () => {
      const token = await AsyncStorage.getItem('accessToken')
      setIsAuthenticated(!!token)
      setLoading(false)
    }

    check()
  }, [])

  const login = async ({ email, password }: { email: string; password: string }) => {
    const res = await appService.login({ email, password, language: 'en', type: 'APP' })

    // API can return { data: { accessToken, refreshToken } } or { accessToken, refreshToken }
    const payload = res?.data ?? res
    const accessToken = payload?.accessToken ?? payload?.data?.accessToken
    const refreshToken = payload?.refreshToken ?? payload?.data?.refreshToken

    if (!accessToken) throw new Error('Missing access token from login response')

    await AsyncStorage.setItem('accessToken', accessToken)
    if (refreshToken) await AsyncStorage.setItem('refreshToken', refreshToken)

    setIsAuthenticated(true)
  }

  const logout = async () => {
    await AsyncStorage.removeItem('accessToken')
    await AsyncStorage.removeItem('refreshToken')
    setIsAuthenticated(false)
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}