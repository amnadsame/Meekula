import React from 'react'
import { View, Image, StyleSheet, TouchableOpacity, Platform, StatusBar } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

const STATUS_BAR_HEIGHT = Platform.OS === 'android' ? StatusBar.currentHeight ?? 0 : 0
const BAR_HEIGHT = 60

export default function Navbar() {
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
        <TouchableOpacity>
          <Ionicons name="search-outline" size={22} color="#000" />
        </TouchableOpacity>

        <TouchableOpacity>
          <Ionicons name="notifications-outline" size={22} color="#000" />
        </TouchableOpacity>

        <TouchableOpacity>
          <Image
            source={require('../../assets/avatar.png')}
            style={styles.avatar}
          />
        </TouchableOpacity>
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
    gap: 18,
  },

  avatar: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: '#ddd',
  },
})
