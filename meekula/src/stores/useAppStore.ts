import { create } from 'zustand'
import { appService } from '../services/appService'

type PopupMessage = { display: boolean; type?: string; content?: string }

type AppState = {
  popupMessage: PopupMessage
  userData: any
  routeHomeCurrent: string
  snackbar: { show: boolean; message?: string }
  mapAlready: boolean
  coordinates: any
  premiums: any[]
  depositEmployees: any[]
  adsCustom: any
  autoRenew: boolean

  setPopupMessage: (payload: PopupMessage) => void
  login: (data: any) => Promise<any>
  sendOtp: (data: any) => Promise<any>
  emailAuth: (data: any) => Promise<any>
  signUp: (data: any) => Promise<any>
  forgotPassword: (data: any) => Promise<any>
  getUserData: (data?: any) => Promise<any>
  saveProfile: (data: any) => Promise<any>
  getAddressToKeyWord: (data: any) => Promise<any>
  getAddressToLatLng: (data: any) => Promise<any>
  changeSettings: (data: any) => Promise<any>
  searchUsers: (data: any) => Promise<any>
  referralSource: (data: any) => Promise<any>
  getPremiums: () => Promise<any>
  updateAutoRenew: (data: any) => Promise<any>
  getDepositEmployees: () => Promise<any>
  upgradePremium: (data: any) => Promise<any>
  getAllAdsCustom: () => Promise<any>
}

export const useAppStore = create<AppState>((set, get) => ({
  // helper to normalize API responses: prefer result -> data -> raw
  // ensures store actions return the actual payload (value) instead of full response
  // usage: const val = norm(res)
  norm: (res: any) => (res?.result ?? res?.data ?? res),
  popupMessage: { display: false, type: '', content: '' },
  userData: {},
  routeHomeCurrent: '/tourist-place',
  snackbar: { show: false, message: '' },
  mapAlready: false,
  coordinates: null,
  premiums: [],
  depositEmployees: [],
  adsCustom: {},
  autoRenew: false,

  setPopupMessage: (payload: PopupMessage) => set({ popupMessage: payload }),

  login: async (data = {}) => {
    const res = await appService.login(data)
    return (get() as any).norm(res)
  },

  sendOtp: async (data) => appService.sendOtp(data),
  emailAuth: async (data) => appService.emailAuth(data),
  signUp: async (data) => appService.signUp(data),
  forgotPassword: async (data) => appService.forgotPassword(data),

  getUserData: async (data = {}) => {
    const res = await appService.getUserData(data)
    const val = (get() as any).norm(res)
    if (!data?.accountId) set({ userData: val })
    return val
  },

  saveProfile: async (data) => {
    const res = await appService.saveProfile(data)
    const val = (get() as any).norm(res)
    set({ userData: { ...(get().userData || {}), ...(val || {}) } })
    return val
  },

  getAddressToKeyWord: async (data) => {
    const res = await appService.getAddressToKeyWord(data)
    const val = (get() as any).norm(res)
    return { ...res, results: val?.results ?? val?.result?.results }
  },

  getAddressToLatLng: async (data) => {
    const res = await appService.getAddressToLatLng(data)
    const val = (get() as any).norm(res)
    return { ...res, results: val?.results ?? val?.result?.results }
  },

  changeSettings: async (data) => {
    const res = await appService.changeSettings(data)
    return (get() as any).norm(res)
  },
  searchUsers: async (data) => {
    const res = await appService.searchUsers(data)
    return (get() as any).norm(res)
  },
  referralSource: async (data) => {
    const res = await appService.referralSource(data)
    return (get() as any).norm(res)
  },

  getPremiums: async () => {
    const res = await appService.getPremiums()
    const val = (get() as any).norm(res)
    set({ premiums: val || [] })
    return val
  },

  updateAutoRenew: async (data) => {
    const res = await appService.updateAutoRenew(data)
    return (get() as any).norm(res)
  },

  getDepositEmployees: async () => {
    const res = await appService.getDepositEmployees()
    const val = (get() as any).norm(res)
    set({ depositEmployees: val || [] })
    return val
  },


  upgradePremium: async (data) => appService.upgradePremium(data),

  getAllAdsCustom: async () => {
    const res = await appService.getAllAdsCustom()
    const val = (get() as any).norm(res)
    set({ adsCustom: val || {} })
    return val
  },
}))

export default useAppStore