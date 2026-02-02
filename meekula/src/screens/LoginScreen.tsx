import React, { useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  SafeAreaView,
  Alert,
} from 'react-native'
import { Ionicons, FontAwesome } from '@expo/vector-icons'
import { useAuth } from '../services/auth'

export default function LoginScreen() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [secure, setSecure] = useState(true)
  const [loading, setLoading] = useState(false)

  const { login } = useAuth()

  const handleLogin = async () => {
    try {
      setLoading(true)
      await login({ email, password })
      console.log('Login success')
    } catch (e: any) {
      const status = e.response?.status ?? e.response?.data?.statusCode ?? 'Unknown'
      const url = e.config?.url ?? ''
      const server = e.response?.data ?? {}

      console.error('Login error detailed', { status, url, server, error: e })

      const message = server?.message ?? JSON.stringify(server) ?? e.message
      Alert.alert('Login error', `Status: ${status}\n${message}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />

      {/* LOGO */}
      <Image
        source={require('../../assets/meekula-logo.png')}
        style={styles.logo}
        resizeMode="contain"
      />

      {/* TITLE */}
      <Text style={styles.title}>Login to account</Text>
      <Text style={styles.subtitle}>Welcome back! Please log in to continue.</Text>

      {/* EMAIL */}
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        placeholderTextColor="#888"
        keyboardType="email-address"
        autoCapitalize="none"
      />

      {/* PASSWORD */}
      <View style={styles.passwordWrapper}>
        <TextInput
          placeholder="Password"
          secureTextEntry={secure}
          style={styles.passwordInput}
          placeholderTextColor="#888"
          value={password}
          onChangeText={setPassword}
        />

        <TouchableOpacity onPress={() => setSecure(!secure)}>
          <Ionicons
            name={secure ? 'eye-off-outline' : 'eye-outline'}
            size={22}
            color="#666"
          />
        </TouchableOpacity>
      </View>

      {/* FORGOT */}
      <TouchableOpacity style={styles.forgot}>
        <Text style={styles.forgotText}>Forgot password?</Text>
      </TouchableOpacity>

      {/* LOGIN BUTTON */}
      <TouchableOpacity
        style={[styles.loginBtn, (loading || !email || !password) ? { opacity: 0.6 } : null]}
        onPress={handleLogin}
        disabled={loading || !email || !password}
      >
        <Text style={styles.loginText}>{loading ? 'Đang xử lý...' : 'Login'}</Text>
      </TouchableOpacity>

      {/* SOCIAL */}
      <Text style={styles.orText}>Or log in to your account with</Text>

      <View style={styles.socialRow}>
        <TouchableOpacity style={styles.socialBtn}>
          <FontAwesome name="google" size={22} color="#DB4437" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.socialBtn}>
          <FontAwesome name="facebook" size={22} color="#1877F2" />
        </TouchableOpacity>
      </View>

      {/* SIGNUP */}
      <Text style={styles.signup}>
        Don’t have an account?{' '}
        <Text style={styles.signupLink}>Sign up now!</Text>
      </Text>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8faf7',
    paddingHorizontal: 24,
    alignItems: 'center',
  },

  logo: {
    width: 180,
    height: 80,
    marginTop: 80,
    marginBottom: 20,
  },

  title: {
    fontSize: 26,
    fontWeight: '700',
    marginBottom: 6,
  },

  subtitle: {
    color: '#666',
    marginBottom: 28,
  },

  input: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    paddingHorizontal: 16,
    marginBottom: 16,
    backgroundColor: '#fff',
  },

  passwordWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
  },

  passwordInput: {
    flex: 1,
    height: 50,
  },

  forgot: {
    alignSelf: 'flex-end',
    marginTop: 8,
  },

  forgotText: {
    color: '#39b54a',
  },

  loginBtn: {
    width: '100%',
    height: 50,
    backgroundColor: '#39b54a',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },

  loginText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },

  orText: {
    marginTop: 26,
    marginBottom: 12,
    color: '#666',
  },

  socialRow: {
    flexDirection: 'row',
    gap: 16,
  },

  socialBtn: {
    width: 120,
    height: 48,
    backgroundColor: '#fff',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
  },

  signup: {
    marginTop: 28,
    color: '#333',
  },

  signupLink: {
    color: '#39b54a',
    fontWeight: '600',
  },
})
