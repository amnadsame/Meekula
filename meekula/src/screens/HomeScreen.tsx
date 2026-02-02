import React from 'react'
import { View, Text, Button, StyleSheet, SafeAreaView } from 'react-native'
import { useAuth } from '../services/auth'
import Navbar from '../components/Navbar'

export default function HomeScreen() {
  const { logout } = useAuth()

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <Navbar />
        <Text style={styles.title}>Welcome to Meekula</Text>
        <Button title="Logout" onPress={logout} />
      </View>
    </SafeAreaView>
  )
}

import { Platform, StatusBar } from 'react-native'

const STATUS_BAR_HEIGHT = Platform.OS === 'android' ? StatusBar.currentHeight ?? 0 : 0
const NAVBAR_HEIGHT = 60 + STATUS_BAR_HEIGHT

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#f8faf7' },
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingTop: NAVBAR_HEIGHT },
  title: { fontSize: 20, marginBottom: 12 },
})