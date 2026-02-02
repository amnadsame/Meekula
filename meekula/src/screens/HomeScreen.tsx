import React from 'react'
import { View, Text, Button, StyleSheet } from 'react-native'
import { useAuth } from '../services/auth'

export default function HomeScreen() {
  const { logout } = useAuth()

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Meekula</Text>
      <Button title="Logout" onPress={logout} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  title: { fontSize: 20, marginBottom: 12 },
})