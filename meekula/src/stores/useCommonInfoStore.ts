// import create from 'zustand'
// import { commonInfoService } from '../services/commonInfoService'

// type CommonInfoState = {
//   configs: any[]
//   getCommonInfo: (data?: any) => Promise<any>
//   getConfigs: () => Promise<any>
// }

// export const useCommonInfoStore = create<CommonInfoState>((set) => ({
//   configs: [],

//   getCommonInfo: async (data) => {
//     const res = await commonInfoService.getCommonInfo(data)
//     return res
//   },

//   getConfigs: async () => {
//     const res = await commonInfoService.getConfigs()
//     set({ configs: res?.result || [] })
//     return res
//   },
// }))

// export default useCommonInfoStore