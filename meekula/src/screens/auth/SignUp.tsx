import React, { useState } from 'react'
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native'
import useAppStore from '../../stores/useAppStore'
import { setAccessToken, setRefreshToken, setProfile } from '../../services/storage'
import { useAuth } from '../../services/auth'

type Props = { onClose?: () => void }

const SignUpScreen: React.FC<Props> = ({ onClose }) => {
  const [step, setStep] = useState(0)
  const [email, setEmail] = useState('')
  const [otp, setOtp] = useState('')
  const [fullName, setFullName] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const store = useAppStore()
  const auth = useAuth()

  const sendOtp = async () => {
    if (!email) return Alert.alert('Error', 'Please enter email')
    setLoading(true)
    try {
      const res = await store.sendOtp({ type: 'SIGN_UP', email })
      if (res?.success) setStep(1)
      else Alert.alert('Error', res?.message ?? 'Unable to send OTP')
    } catch (e: any) {
      Alert.alert('Error', e?.message ?? String(e))
    } finally {
      setLoading(false)
    }
  }

  const verifyOtp = async () => {
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

  const createAccount = async () => {
    if (!fullName || !password) return Alert.alert('Error', 'Please fill required')
    setLoading(true)
    try {
      const res = await store.signUp({ email, otpCode: otp, fullName, password })
      if (res?.success) {
        const token = res?.result?.accessToken ?? res?.data?.accessToken
        const refresh = res?.result?.refreshToken ?? res?.data?.refreshToken
        if (token) {
          await setAccessToken(token)
          if (refresh) await setRefreshToken(refresh)
          try {
            await auth.refreshProfile()
          } catch (e) {}
        }
        Alert.alert('Success', 'Account created')
      } else {
        Alert.alert('Error', res?.message ?? 'Unable to create account')
      }
    } catch (e: any) {
      Alert.alert('Error', e?.message ?? String(e))
    } finally {
      setLoading(false)
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ width: '100%', alignItems: 'center' }}>
        <View style={styles.card}>
          {onClose ? (
            <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
              <Text style={styles.closeBtnText}>✕</Text>
            </TouchableOpacity>
          ) : null}
          <Text style={styles.title}>{step === 0 ? 'Đăng ký bằng Email' : step === 1 ? 'Xác thực Email' : 'Tạo tài khoản mới'}</Text>

          {step === 0 && (
            <>
              <TextInput placeholder="Email" value={email} onChangeText={setEmail} style={styles.input} keyboardType="email-address" autoCapitalize="none" />
              <TouchableOpacity style={styles.btn} onPress={sendOtp} disabled={loading}>
                <Text style={styles.btnText}>Gửi mã xác thực</Text>
              </TouchableOpacity>
            </>
          )}

          {step === 1 && (
            <>
              <TextInput placeholder="OTP" value={otp} onChangeText={setOtp} style={styles.input} keyboardType="numeric" />
              <TouchableOpacity style={styles.btn} onPress={verifyOtp} disabled={loading}>
                <Text style={styles.btnText}>Xác nhận mã OTP</Text>
              </TouchableOpacity>
            </>
          )}

          {step === 2 && (
            <>
              <TextInput placeholder="Họ và tên" value={fullName} onChangeText={setFullName} style={styles.input} />
              <TextInput placeholder="Mật khẩu" secureTextEntry value={password} onChangeText={setPassword} style={styles.input} />
              <TouchableOpacity style={styles.btn} onPress={createAccount} disabled={loading}>
                <Text style={styles.btnText}>Tạo tài khoản</Text>
              </TouchableOpacity>
            </>
          )}

        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', backgroundColor: '#f8faf7', paddingHorizontal: 24 },
  card: { width: '100%', maxWidth: 480, backgroundColor: '#fff', padding: 20, borderRadius: 8, marginTop: 40, alignItems: 'center' },
  title: { fontSize: 20, fontWeight: '600', marginBottom: 12 },
  input: { width: '100%', borderWidth: 1, borderColor: '#ddd', borderRadius: 8, padding: 12, marginBottom: 12, backgroundColor: '#fff' },
  btn: { backgroundColor: '#39b54a', padding: 12, borderRadius: 8, width: '100%', alignItems: 'center' },
  btnText: { color: '#fff', fontWeight: '600' },
  closeBtn: { position: 'absolute', left: 12, top: 12, padding: 8 },
  closeBtnText: { fontSize: 18, color: '#666' },
})

export default SignUpScreen

