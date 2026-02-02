import React from 'react'
import { View, StyleSheet, Image, ActivityIndicator, Modal } from 'react-native'

export default function LoadingOverlay() {
  return (
    <Modal visible transparent animationType="fade" statusBarTranslucent>
      <View style={styles.overlay}>
        <View style={styles.box}>
          <Image source={require('../../assets/meekula-logo.png')} style={styles.logo} resizeMode="contain" />
          <ActivityIndicator size="large" color="#39b54a" style={{ marginTop: 20 }} />
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  box: {
    flex: 1,
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 0,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    paddingTop: 80,
  },
  logo: {
    width: 220,
    height: 90,
  },
})