import AsyncStorage from '@react-native-async-storage/async-storage'

// Keys
const ACCESS_KEY = 'accessToken'
const REFRESH_KEY = 'refreshToken'
const PROFILE_KEY = 'userProfile'

// Try to require expo-secure-store if available at runtime
let SecureStore: any = null
try {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  SecureStore = require('expo-secure-store')
} catch (e) {
  SecureStore = null
}

// Secure store helpers (fall back to AsyncStorage if SecureStore not available)
async function setSecureItem(key: string, value: string) {
  if (SecureStore && SecureStore.setItemAsync) {
    return SecureStore.setItemAsync(key, value)
  }
  return AsyncStorage.setItem(key, value)
}

async function getSecureItem(key: string) {
  if (SecureStore && SecureStore.getItemAsync) {
    return SecureStore.getItemAsync(key)
  }
  return AsyncStorage.getItem(key)
}

async function deleteSecureItem(key: string) {
  if (SecureStore && SecureStore.deleteItemAsync) {
    return SecureStore.deleteItemAsync(key)
  }
  return AsyncStorage.removeItem(key)
}

// Access token
export async function setAccessToken(token: string) {
  return setSecureItem(ACCESS_KEY, token)
}
export async function getAccessToken(): Promise<string | null> {
  return getSecureItem(ACCESS_KEY)
}
export async function removeAccessToken() {
  return deleteSecureItem(ACCESS_KEY)
}

// Refresh token
export async function setRefreshToken(token: string) {
  return setSecureItem(REFRESH_KEY, token)
}
export async function getRefreshToken(): Promise<string | null> {
  return getSecureItem(REFRESH_KEY)
}
export async function removeRefreshToken() {
  return deleteSecureItem(REFRESH_KEY)
}

// Profile (stored in AsyncStorage)
export async function setProfile(profile: any) {
  return AsyncStorage.setItem(PROFILE_KEY, JSON.stringify(profile))
}
export async function getProfile(): Promise<any | null> {
  try {
    const raw = await AsyncStorage.getItem(PROFILE_KEY)
    return raw ? JSON.parse(raw) : null
  } catch (e) {
    return null
  }
}
export async function removeProfile() {
  return AsyncStorage.removeItem(PROFILE_KEY)
}

export default {
  setAccessToken,
  getAccessToken,
  removeAccessToken,
  setRefreshToken,
  getRefreshToken,
  removeRefreshToken,
  setProfile,
  getProfile,
  removeProfile,
}