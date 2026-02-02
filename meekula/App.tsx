import React from 'react'
import { StatusBar } from 'expo-status-bar'
import LoginScreen from './src/screens/LoginScreen'
import HomeScreen from './src/screens/HomeScreen'
import { AuthProvider, useAuth } from './src/services/auth'

function Root() {
  const { isAuthenticated, loading } = useAuth()

  if (loading) return null

  return isAuthenticated ? <HomeScreen /> : <LoginScreen />
}

export default function App() {
  return (
    <AuthProvider>
      <StatusBar style="auto" />
      <Root />
    </AuthProvider>
  )
}
