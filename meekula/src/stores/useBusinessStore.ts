// import create from 'zustand'
// import { businessService } from '../services/businessService'

// type BusinessState = {
//   myBusinesses: any
//   recentBusinesses: any
//   businessDetail: any
//   addressCurrent: any

//   getMyBusinesses: (data: any) => Promise<any>
//   createBusiness: (data: any) => Promise<any>
//   updateBusiness: (data: any) => Promise<any>
//   getRecentBusinesses: (data: any) => Promise<any>
//   getBusinessDetail: (data: any) => Promise<any>
//   businessUploadFiles: (data: any) => Promise<any>
//   businessDeleteFile: (data: any) => Promise<any>
//   deleteBusiness: (data: any) => Promise<any>
//   updateVisitedBusiness: (data: any) => Promise<any>
//   getBusinessReview: (data: any) => Promise<any>
//   sendBusinessReview: (data: any) => Promise<any>
//   autoTranslationDescription: (data: any) => Promise<any>
//   checkReferralCode: (data: any) => Promise<any>
// }

// export const useBusinessStore = create<BusinessState>((set, get) => ({
//   myBusinesses: {},
//   recentBusinesses: { items: [] },
//   businessDetail: {},
//   addressCurrent: [],

//   getMyBusinesses: async (data) => {
//     const res = await businessService.getMyBusinesses(data)
//     if (data.page === 1) set({ myBusinesses: res?.result })
//     else set({ myBusinesses: { ...(get().myBusinesses || {}), items: [...(get().myBusinesses?.items || []), ...(res?.result?.items || [])] } })
//     return res
//   },

//   createBusiness: async (data) => businessService.createBusiness(data),
//   updateBusiness: async (data) => businessService.updateBusiness(data),

//   getRecentBusinesses: async (data) => {
//     const res = await ( !data.type || data.type == 'Search' ? businessService.searchBusinesses(data) : businessService.getRecentBusinesses(data) )
//     if (data.page === 1) set({ recentBusinesses: res?.result })
//     else set({ recentBusinesses: { ...(get().recentBusinesses || {}), items: [...(get().recentBusinesses?.items || []), ...(res?.result?.items || [])] } })
//     return res
//   },

//   getBusinessDetail: async (data) => {
//     const res = await businessService.getBusinessDetail(data)
//     set({ businessDetail: res?.result })
//     return res
//   },

//   businessUploadFiles: async (data) => businessService.businessUploadFiles(data),
//   businessDeleteFile: async (data) => businessService.businessDeleteFile(data),
//   deleteBusiness: async (data) => businessService.deleteBusiness(data),
//   updateVisitedBusiness: async (data) => businessService.updateVisitedBusiness(data),
//   getBusinessReview: async (data) => businessService.getBusinessReview(data),
//   sendBusinessReview: async (data) => businessService.sendBusinessReview(data),
//   autoTranslationDescription: async (data) => businessService.autoTranslationDescription(data),
//   checkReferralCode: async (data) => businessService.checkReferralCode(data),
// }))

// export default useBusinessStore