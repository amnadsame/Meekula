import React from 'react'
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { useTranslation } from '../utils/i18n'
import { useAuth } from '../services/auth'
import { appService } from '../services/appService'

const LANGS = [
  { code: 'en', label: 'English', flag: '🇬🇧' },
  { code: 'vi', label: 'Tiếng Việt', flag: '🇻🇳' },
  { code: 'la', label: 'Lao', flag: '🇱🇦' },
  { code: 'th', label: 'ไทย', flag: '🇹🇭' },
]

export default function LanguageSwitcher({ visible, onClose }: { visible: boolean; onClose: () => void }) {
  const { t, changeLanguage } = useTranslation()
  const { isAuthenticated, refreshProfile } = useAuth()

  const select = async (code: string) => {
    // update local language
    changeLanguage(code)
    try {
      // update server side if user logged in
      if (isAuthenticated) {
        await appService.changeSettings({ language: code })
        await refreshProfile()
      }
    } catch (e) {
      console.warn('Failed to update language on server', e)
    }
    onClose()
  }

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.box}>
          <Text style={styles.title}>{t('Đổi ngôn ngữ')}</Text>
          {LANGS.map((l) => (
            <TouchableOpacity key={l.code} style={styles.row} onPress={() => select(l.code)}>
              <Text style={styles.flag}>{l.flag}</Text>
              <Text style={styles.label}>{l.label}</Text>
            </TouchableOpacity>
          ))}

          <TouchableOpacity style={styles.close} onPress={onClose}>
            <Text style={{ color: '#39b54a' }}>{ t('Đóng') }</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'center', alignItems: 'center' },
  box: { width: 300, backgroundColor: '#fff', borderRadius: 8, padding: 16 },
  title: { fontWeight: '700', marginBottom: 12 },
  row: { flexDirection: 'row', alignItems: 'center', paddingVertical: 10 },
  flag: { fontSize: 20, marginRight: 12 },
  label: { fontSize: 16 },
  close: { marginTop: 12, alignItems: 'center' },
})