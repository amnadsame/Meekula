// import create from 'zustand'
// import { advertisementService } from '../services/advertisementService'

// type Ads = any

// type AdvertisementState = {
//   loading: boolean
//   error: any | null
//   userAds: Ads[]
//   createAdvertisement: (formData: any) => Promise<any>
//   getAllAdsUser: () => Promise<any>
//   deleteAdsUser: (id: string) => Promise<any>
//   getAdsImageRightBar: (type: string, device?: string) => Promise<any>
//   getAdsVideoRightBar: (type: string) => Promise<any>
// }

// export const useAdvertisementStore = create<AdvertisementState>((set) => ({
//   loading: false,
//   error: null,
//   userAds: [],

//   createAdvertisement: async (formData: any) => {
//     set({ loading: true, error: null })
//     try {
//       const res = await advertisementService.createAdvertisement(formData)
//       set({ loading: false })
//       return res
//     } catch (e) {
//       set({ loading: false, error: e })
//       throw e
//     }
//   },

//   getAllAdsUser: async () => {
//     set({ loading: true, error: null })
//     try {
//       const res = await advertisementService.getAllAdsUser()
//       set({ loading: false, userAds: res?.result || [] })
//       return res
//     } catch (e) {
//       set({ loading: false, error: e })
//       throw e
//     }
//   },

//   deleteAdsUser: async (id: string) => {
//     set({ loading: true, error: null })
//     try {
//       const res = await advertisementService.deleteAdsUser({ _id: id })
//       set((state) => ({ loading: false, userAds: state.userAds.filter((a: any) => (a?._id ?? a?.id) !== id) }))
//       return res
//     } catch (e) {
//       set({ loading: false, error: e })
//       throw e
//     }
//   },

//   getAdsImageRightBar: async (type: string, device?: string) => {
//     set({ loading: true, error: null })
//     try {
//       const res = await advertisementService.getAdsImageRightBar(type, device)
//       set({ loading: false })
//       return res
//     } catch (e) {
//       set({ loading: false, error: e })
//       throw e
//     }
//   },

//   getAdsVideoRightBar: async (type: string) => {
//     set({ loading: true, error: null })
//     try {
//       const res = await advertisementService.getAdsVideoRightBar(type)
//       set({ loading: false })
//       return res
//     } catch (e) {
//       set({ loading: false, error: e })
//       throw e
//     }
//   },
// }))

// export default useAdvertisementStore