// import create from 'zustand'
// import { earnMoneyService } from '../services/earnMoneyService'

// type EarnMoneyState = {
//   businessByEmployee: any
//   paramsCustomerByEmployee: any
//   paymentSchedule: any[]
//   getCustomerByEmployee: (data: any) => Promise<any>
//   getPaymentSchedule: () => Promise<any>
// }

// export const useEarnMoneyStore = create<EarnMoneyState>((set) => ({
//   businessByEmployee: {},
//   paramsCustomerByEmployee: { status: null },
//   paymentSchedule: [],

//   getCustomerByEmployee: async (data) => {
//     const res = await earnMoneyService.getCustomerByEmployee(data)
//     set({ businessByEmployee: res?.result || {} })
//     return res
//   },

//   getPaymentSchedule: async () => {
//     const res = await earnMoneyService.getPaymentSchedule()
//     set({ paymentSchedule: res?.result || [] })
//     return res
//   },
// }))

// export default useEarnMoneyStore