import React, { useEffect, useState } from 'react'
import { Modal, View, Text, Image, TouchableOpacity, StyleSheet, ScrollView, ActivityIndicator } from 'react-native'
import { useAuth } from '../services/auth'
import { useTranslation } from '../utils/i18n'
import LanguageSwitcher from './LanguageSwitcher'
import { MaterialCommunityIcons } from '@expo/vector-icons'

export default function UserPanel({ visible, onClose }: { visible: boolean; onClose: () => void }) {
  const { userProfile, logout, refreshProfile } = useAuth()
  const [loading, setLoading] = useState(false)
  const [showLang, setShowLang] = useState(false)

  useEffect(() => {
    let mounted = true
    const ensure = async () => {
      if (!visible) return
      if (!userProfile) {
        try {
          setLoading(true)
          await refreshProfile()
        } catch (e) {
          console.warn('Failed to refresh profile', e)
        } finally {
          if (mounted) setLoading(false)
        }
      }
    }

    ensure()
    return () => {
      mounted = false
    }
  }, [visible])

  const { t } = useTranslation()

  const email = userProfile?.email ?? userProfile?.result?.userData?.email ?? userProfile?.result?.email
  const displayName = userProfile?.fullName ?? userProfile?.result?.userData?.fullName ?? email
  const points = userProfile?.points ?? userProfile?.result?.userData?.points ?? null

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.overlay}>
        <View style={styles.panel}>
          {/* top-right close X */}
          <TouchableOpacity style={styles.topClose} onPress={onClose} accessibilityLabel="Close user panel">
            <MaterialCommunityIcons name="close" size={30} color="#333" />
          </TouchableOpacity>

          <ScrollView>
            <View style={styles.header}>
              <Image source={require('../../assets/avatar.png')} style={styles.avatar} />
              <View style={{ marginLeft: 12 }}>
                <Text style={styles.email}>{email ?? 'No email'}</Text>
                {points != null ? <Text style={styles.points}>{points} point</Text> : null}
              </View>
            </View>

            <View style={styles.menu}>
              <MenuRow icon="account-circle" labelKey="user.account" />
              <MenuRow icon="storefront" labelKey="user.myBusiness" />
              <MenuRow icon="arrow-up-bold-circle" labelKey="user.upgradeAccount" />
              <MenuRow icon="bullhorn" labelKey="user.advertisement" />
              <MenuRow icon="credit-card-outline" labelKey="user.topUpPoints" />
              <MenuRow icon="information-outline" labelKey="user.infoWebsite" />
              <MenuRow icon="cog-outline" labelKey="user.settings" />

              <TouchableOpacity style={styles.row} onPress={() => setShowLang(true)}>
                <MaterialCommunityIcons name="translate" size={20} color="#333" />
                <Text style={[styles.label, { marginLeft: 12 }]}>{t('app.changeLanguage')}</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.logout} onPress={async () => { await logout(); onClose(); }}>
                <MaterialCommunityIcons name="logout" size={20} color="#e74c3c" />
                <Text style={[styles.label, { color: '#e74c3c', marginLeft: 12 }]}>{t('app.logout')}</Text>
              </TouchableOpacity>
            </View>

            {/* language modal */}
            {showLang ? <LanguageSwitcher visible={showLang} onClose={() => setShowLang(false)} /> : null }

          </ScrollView>
        </View>
      </View>
    </Modal>
  )
}

function MenuRow({ icon, labelKey }: { icon: string; labelKey: string }) {
  const { t } = useTranslation()
  return (
    <TouchableOpacity style={styles.row} activeOpacity={0.7}>
      <MaterialCommunityIcons name={icon as any} size={20} color="#333" />
      <Text style={styles.label}>{t(labelKey)}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'flex-end' },
  panel: { height: '100%', backgroundColor: '#fff', padding: 16 },
  topClose: { position: 'absolute', right: 12, top: 12, zIndex: 20 },
  header: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  avatar: { width: 64, height: 64, borderRadius: 32, backgroundColor: '#ddd' },
  email: { fontWeight: '600' },
  points: { color: '#888', marginTop: 2 },
  menu: { marginTop: 8 },
  row: { flexDirection: 'row', alignItems: 'center', paddingVertical: 12 },
  label: { marginLeft: 12, fontSize: 15 },
  logout: { marginTop: 12, flexDirection: 'row', alignItems: 'center' },
  closeBtn: { marginTop: 16, alignItems: 'center' },
})