import { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

const STORAGE_KEY = 'app_language'

import resourcesRaw from '../i18n'

// resources holds translations keyed by language code (en/vi/la/th)
const resources: Record<string, Record<string, string>> = resourcesRaw as any

let current = 'en'
const listeners = new Set<() => void>()

export async function initI18n() {
  try {
    const lang = await AsyncStorage.getItem(STORAGE_KEY)
    if (lang && resources[lang]) {
      current = lang
    }
  } catch (e) {
    // ignore
  }
}

export function t(key: string) {
  return resources[current]?.[key] ?? key
}

export function changeLanguage(lang: string) {
  if (!resources[lang]) return
  current = lang
  try {
    AsyncStorage.setItem(STORAGE_KEY, lang)
  } catch (e) {
    // ignore
  }
  listeners.forEach((l) => l())
}

export function useTranslation() {
  const [, setVersion] = useState(0)
  useEffect(() => {
    const cb = () => setVersion((v) => v + 1)
    listeners.add(cb)
    return () => {
      listeners.delete(cb)
    }
  }, [])

  return {
    t: (k: string) => t(k),
    lang: () => current,
    changeLanguage,
  }
}

export { resources }
