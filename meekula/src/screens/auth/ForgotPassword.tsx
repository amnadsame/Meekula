import React, { useState, useEffect } from 'react'
import { View, Text, TextInput, TouchableOpacity, Modal, StyleSheet, Alert } from 'react-native'
import useAppStore from '../../stores/useAppStore'
import { setAccessToken, setRefreshToken, setProfile } from '../../services/storage'
import { useAuth } from '../../services/auth'

const ForgotPassword: React.FC = () => {
  const [visible, setVisible] = useState(false)
  const [step, setStep] = useState(0)
  const [email, setEmail] = useState('')
  const [otp, setOtp] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const store = useAppStore()
  const auth = useAuth()

  const open = () => setVisible(true)
  const close = () => {
    setVisible(false)
    setStep(0)
    setEmail('')
    setOtp('')
    setPassword('')
  }

  const handleSendOtp = async () => {
    if (!email) {
      Alert.alert('Error', 'Please enter your email')
      return
    }
    setLoading(true)
    try {
      const res = await store.sendOtp({ type: 'FORGOT_PASSWORD', email })
      if (res?.success) {
        setStep(1)
      } else {
        Alert.alert('Error', res?.message ?? 'Unable to send OTP')
      }
    } catch (e: any) {
      Alert.alert('Error', e?.message ?? String(e))
    } finally {
      setLoading(false)
    }
  }

  const handleVerifyOtp = async () => {
    if (!otp) return Alert.alert('Error', 'Please enter OTP')
    setLoading(true)
    try {
      const res = await store.emailAuth({ email, otpCode: otp })
      if (res?.success) setStep(2)
      else Alert.alert('Error', res?.message ?? 'Invalid OTP')
    } catch (e: any) {
      Alert.alert('Error', e?.message ?? String(e))
    } finally {
      setLoading(false)
    }
  }

  const handleResetPassword = async () => {
    if (!password || password.length < 8) return Alert.alert('Error', 'Password is too short')
    setLoading(true)
    try {
      const res = await store.forgotPassword({ email, otpCode: otp, password })
      if (res?.success) {
        // store tokens if returned
        const token = res?.result?.accessToken ?? res?.data?.accessToken
        const refresh = res?.result?.refreshToken ?? res?.data?.refreshToken
        if (token) {
          await setAccessToken(token)
          if (refresh) await setRefreshToken(refresh)
          // try refresh profile
          try {
            await auth.refreshProfile()
          } catch (e) {
            // ignore
          }
        }
        Alert.alert('Success', 'Password reset successfully')
        close()
      } else {
        Alert.alert('Error', res?.message ?? 'Unable to reset password')
      }
    } catch (e: any) {
      Alert.alert('Error', e?.message ?? String(e))
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <TouchableOpacity onPress={open}>
        <Text style={styles.link}>Quên mật khẩu?</Text>
      </TouchableOpacity>

      <Modal visible={visible} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.title}>Khôi phục mật khẩu</Text>

            {step === 0 && (
              <>
                <Text style={styles.label}>Email</Text>
                <TextInput style={styles.input} value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" />
                <TouchableOpacity style={styles.btn} onPress={handleSendOtp} disabled={loading}>
                  <Text style={styles.btnText}>Gửi mã xác thực</Text>
                </TouchableOpacity>
              </>
            )}

            {step === 1 && (
              <>
                <Text style={styles.label}>Nhập mã OTP</Text>
                <TextInput style={styles.input} value={otp} onChangeText={setOtp} keyboardType="numeric" />
                <TouchableOpacity style={styles.btn} onPress={handleVerifyOtp} disabled={loading}>
                  <Text style={styles.btnText}>Xác nhận mã OTP</Text>
                </TouchableOpacity>
              </>
            )}

            {step === 2 && (
              <>
                <Text style={styles.label}>Mật khẩu mới</Text>
                <TextInput style={styles.input} value={password} onChangeText={setPassword} secureTextEntry />
                <TouchableOpacity style={styles.btn} onPress={handleResetPassword} disabled={loading}>
                  <Text style={styles.btnText}>Đặt lại mật khẩu</Text>
                </TouchableOpacity>
              </>
            )}

            <TouchableOpacity onPress={close} style={{ marginTop: 12 }}>
              <Text style={styles.cancel}>Đóng</Text>
            </TouchableOpacity>

          </View>
        </View>
      </Modal>
    </>
  )
}

const styles = StyleSheet.create({
  link: { color: '#39b54a' },
  modalContainer: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center' },
  modalContent: { width: '90%', backgroundColor: '#fff', padding: 20, borderRadius: 8 },
  title: { fontSize: 18, fontWeight: '600', marginBottom: 12 },
  label: { marginTop: 6, marginBottom: 6 },
  input: { borderWidth: 1, borderColor: '#ddd', padding: 10, borderRadius: 6, marginBottom: 8 },
  btn: { backgroundColor: '#39b54a', padding: 12, borderRadius: 6, alignItems: 'center' },
  btnText: { color: '#fff', fontWeight: '600' },
  cancel: { color: '#666', textAlign: 'center' },
})

export default ForgotPassword

 
