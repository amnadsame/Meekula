import React from 'react'
import { Modal, View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native'
import { useAuth } from '../services/auth'
import { MaterialCommunityIcons } from '@expo/vector-icons'

export default function UserPanel({ visible, onClose }: { visible: boolean; onClose: () => void }) {
  const { userProfile, logout } = useAuth()

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
              <MenuRow icon="account-circle" label="Account" />
              <MenuRow icon="storefront" label="My Business" />
              <MenuRow icon="arrow-up-bold-circle" label="Upgrade account" />
              <MenuRow icon="bullhorn" label="Advertisement" />
              <MenuRow icon="credit-card-outline" label="Top up points" />
              <MenuRow icon="information-outline" label="Information about the website" />
              <MenuRow icon="cog-outline" label="Settings" />

              <TouchableOpacity style={styles.logout} onPress={async () => { await logout(); onClose(); }}>
                <MaterialCommunityIcons name="logout" size={20} color="#e74c3c" />
                <Text style={[styles.label, { color: '#e74c3c', marginLeft: 12 }]}>Logout</Text>
              </TouchableOpacity>
            </View>

          </ScrollView>
        </View>
      </View>
    </Modal>
  )
}

function MenuRow({ icon, label }: { icon: string; label: string }) {
  return (
    <View style={styles.row}>
      <MaterialCommunityIcons name={icon as any} size={20} color="#333" />
      <Text style={styles.label}>{label}</Text>
    </View>
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