import { axiosInstance } from './api'

export const appService = {
  login: async (data: {
    email?: string
    userName?: string
    credential?: string
    password: string
    language?: string
    type?: string
  }) => {
    const payload = {
      language: data.language,
      type: data.type,
      credential: data.credential ?? data.email ?? data.userName,
      userName: data.userName ?? data.email,
      email: data.email ?? data.userName,
      password: data.password,
    }

    const endpoints = ['/auth/sign-in', '/auth/signin', '/auth/login']
    let lastErr: any = null

    for (const ep of endpoints) {
      try {
        console.debug('[appService] trying login endpoint', ep, payload)
        return await axiosInstance.post(ep, payload)
      } catch (e: any) {
        if (e?.response?.status === 404) {
          lastErr = e
          continue
        }
        throw e
      }
    }

    throw lastErr ?? new Error('Login failed')
  },

  sendOtp: (data: { type: string; email: string }) =>
    axiosInstance.post('app/send-email', { type: data.type, email: data.email }),

  emailAuth: (data: { email: string; otpCode: string }) =>
    axiosInstance.post('app/email-auth', { email: data.email, otp: data.otpCode }),

  signUp: (data: { email: string; otpCode: string; fullName: string; password: string }) =>
    axiosInstance.post('auth/sign-up', {
      email: data.email,
      otp: data.otpCode,
      fullName: data.fullName,
      password: data.password,
    }),

  forgotPassword: (data: { email: string; otpCode?: string; password?: string }) =>
    axiosInstance.post('auth/forgot-password', {
      email: data.email,
      otp: data.otpCode,
      password: data.password,
    }),

  getUserData: (data?: { accountId?: string }) =>
    axiosInstance.get('users/profile', { params: { accountId: data?.accountId } }),

  getUserProfile: (data?: { accountId?: string }) =>
    axiosInstance.get('users/user-profile', { params: { accountId: data?.accountId } }),

  saveProfile: (data: { avatar?: any; fullName?: string; note?: string; phone?: string; address?: string; isDelAvatar?: boolean }) => {
    const formData = new FormData()
    if (data.avatar) formData.append('avatar', data.avatar as any)
    if (data.fullName) formData.append('fullName', data.fullName)

    if (data.note) formData.append('note', data.note)
    if (data.phone) formData.append('phone', data.phone)
    if (data.address) formData.append('address', data.address)
    formData.append('isDelAvatar', String(Boolean(!data.avatar)))

    return axiosInstance.put('users/profile', formData)
  },

  getAddressToKeyWord: (data: { keyWord: string; lat?: number; lng?: number; radius?: number }) =>
    axiosInstance.get('google-map/place/text-search', { params: { q: data.keyWord, lat: data.lat, lng: data.lng, radius: data.radius } }),

  getAddressToLatLng: (data: { lat: number; lng: number }) =>
    axiosInstance.get('google-map/place/nearby-search', { params: { lat: data.lat, lng: data.lng, radius: 50 } }),

  changeSettings: (data: { language?: string }) => {
    if (!Object.keys(data || {}).length) return Promise.resolve()
    return axiosInstance.put('users/change-settings', { language: data?.language })
  },

  searchUsers: (data: { keywords?: string }) =>
    axiosInstance.get('users/search', { params: { keywords: data?.keywords } }),

  referralSource: (data: { referralSource?: string }) =>
    axiosInstance.put('users/referral-source', { referralSource: data?.referralSource }),

  getPremiums: () => axiosInstance.get('premiums'),

  getDepositEmployees: () => axiosInstance.get('users/deposit-employees'),

  getAllAdsCustom: () => axiosInstance.get('ads-custom', { params: { page: 1, itemsPerPage: 99999 } }),

  upgradePremium: (data: { premiumId?: string; autoRenew?: boolean }) =>
    axiosInstance.put('users/upgrade-premium', { premiumId: data?.premiumId, autoRenew: data?.autoRenew }),

  updateAutoRenew: (data: { autoRenew?: boolean }) =>
    axiosInstance.get('users/toggle-auto-renew', { data: { autoRenew: data?.autoRenew } }),

  getLinkPayment: (data: { amount?: number; description?: string }) =>
    axiosInstance.post('users/payment-link', { amount: data?.amount, description: data?.description }),
}

