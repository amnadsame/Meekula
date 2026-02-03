import React, { useState } from 'react'
import { View, Image, StyleSheet, TouchableOpacity, Platform, StatusBar, Text } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import UserPanel from './UserPanel'
import LanguageSwitcher from './LanguageSwitcher'
import { useTranslation } from '../utils/i18n'

const STATUS_BAR_HEIGHT = Platform.OS === 'android' ? StatusBar.currentHeight ?? 0 : 0
const BAR_HEIGHT = 60

export default function Navbar() {
  const [showPanel, setShowPanel] = useState(false)
  const [showLang, setShowLang] = useState(false)
  const { lang } = useTranslation()
  const flagMap: Record<string, string> = { en: '🇬🇧', vi: '🇻🇳', la: '🇱🇦', th: '🇹🇭' }
  const currentFlag = flagMap[lang()] ?? '🌐'

  return (
    <View style={[styles.container, { paddingTop: STATUS_BAR_HEIGHT, height: BAR_HEIGHT + STATUS_BAR_HEIGHT }]}>
      {/* LEFT - Logo */}
      <Image
        source={require('../../assets/meekula-logo.png')}
        style={styles.logo}
        resizeMode="contain"
      />

      {/* RIGHT - Icons */}
      <View style={styles.right}>
        <TouchableOpacity onPress={() => setShowLang(true)} style={styles.langBtn}>
          <Text style={styles.langText}>{currentFlag}</Text>
        </TouchableOpacity>

        <TouchableOpacity>
          <Ionicons name="search-outline" size={22} color="#000" />
        </TouchableOpacity>

        <TouchableOpacity>
          <Ionicons name="notifications-outline" size={22} color="#000" />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setShowPanel(true)}>
          <Image
            source={require('../../assets/avatar.png')}
            style={styles.avatar}
          />
        </TouchableOpacity>

        {/* user panel modal */}
        {showPanel ? <UserPanel visible={showPanel} onClose={() => setShowPanel(false)} /> : null}

        {/* language modal */}
        {showLang ? <LanguageSwitcher visible={showLang} onClose={() => setShowLang(false)} /> : null}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
    zIndex: 999,

    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    elevation: 4, // android shadow
    shadowColor: '#000', // ios shadow
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },

  logo: {
    width: 130,
    height: 40,
  },

  right: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },

  langBtn: {
    paddingHorizontal: 6,
    paddingVertical: 4,
    marginRight: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  langText: {
    fontSize: 18,
  },

  avatar: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: '#ddd',
  },
})
