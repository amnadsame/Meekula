import { Alert } from 'react-native'

export const showSuccess = (message: string) => {
  try {
    Alert.alert('Success', String(message))
  } catch (e) {
    console.log('showSuccess', message)
  }
}

export const showError = (message: string) => {
  try {
    Alert.alert('Error', String(message))
  } catch (e) {
    console.log('showError', message)
  }
}