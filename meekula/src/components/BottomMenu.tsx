import React, { useState } from 'react'
import { View, TouchableOpacity, StyleSheet, Text, SafeAreaView, Platform } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'

const MENU_ITEMS = [
  { key: 'home', icon: 'apps', label: 'Home' },
  { key: 'map', icon: 'map-marker', label: 'Map' },
  { key: 'restaurant', icon: 'silverware-fork-knife', label: 'Restaurant' },
  { key: 'business', icon: 'storefront', label: 'Business' },
  { key: 'cars', icon: 'car', label: 'Cars' },
]

export default function BottomMenu() {
  const [active, setActive] = useState('home')

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        {MENU_ITEMS.map((it) => (
          <TouchableOpacity
            key={it.key}
            style={styles.item}
            onPress={() => setActive(it.key)}
            activeOpacity={0.7}
          >
            <MaterialCommunityIcons
              name={it.icon as any}
              size={24}
              color={active === it.key ? '#39b54a' : '#222'}
            />
            <Text style={[styles.label, active === it.key ? { color: '#39b54a' } : null]}>{it.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  )
}

const HEIGHT = 70

const styles = StyleSheet.create({
  safe: {
    backgroundColor: 'transparent',
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 50,
    zIndex: 999,
  },
  container: {
    height: HEIGHT,
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingBottom: Platform.OS === 'android' ? 10 : 12,
    paddingHorizontal: 8,
    elevation: 6,
    shadowOpacity: 0.08,
  },
  item: {
    flex: 1,
    minWidth: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontSize: 10,
    marginTop: 4,
  },
})