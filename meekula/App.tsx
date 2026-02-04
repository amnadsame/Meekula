import React from 'react'
import { StatusBar } from 'expo-status-bar'
import SignInScreen from './src/screens/auth/SignIn'
import HomeScreen from './src/screens/HomeScreen'
import { AuthProvider, useAuth } from './src/services/auth'

function Root() {
  const { isAuthenticated, loading } = useAuth()

  if (loading) return null

  return isAuthenticated ? <HomeScreen /> : <SignInScreen />
}

export default function App() {
  return (
    <AuthProvider>
      <StatusBar style="auto" />
      <Root />
    </AuthProvider>
  )
}
