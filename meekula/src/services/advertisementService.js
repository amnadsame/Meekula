// import { axiosInstance } from './api'

// class advertisementService {
//   static async createAdvertisement(payload) {
//     const formData = new FormData()

//     formData.append('title', payload.title)
//     // formData.append('description', payload.description)
//     formData.append('type', payload.type) 
//     formData.append('link', payload.link)
//     formData.append('points', payload.points)
//     formData.append('status', payload.status)
//     formData.append('startDate', payload.startDate || '')
//     // formData.append('endDate', payload.endDate || '')
//     // formData.append('region', payload.region || '')
    
//     if (payload.adsMedia) {
//       formData.append('adsMedia', payload.adsMedia)
//     }

//     if (payload._id) {
//       formData.append('_id', payload._id)
//     }

//     return axiosInstance({
//       method: 'POST',
//       url: '/ads-user',
//       data: formData,
//     })
//   }

//   static async getAllAdsUser(params) {
//     return axiosInstance({
//       method: 'GET',
//       url: 'ads-user/ads-my-user',
//       params: {
//         search: params?.search,
//         type: params?.type,
//         status: params?.status,
//         page: params?.page,
//         itemsPerPage: params?.itemsPerPage,
//       },
//     })
//   }

//   static async deleteAdsUser(params) {
//     return axiosInstance({
//       method: 'DELETE',
//       url: 'ads-user',
//       params: { _id: params?._id },
//     })
//   }

//   static async getAdsImageRightBar(type, device){

//     return axiosInstance({
//       method: 'GET',
//       url: `/ads-user/run-ads-user?type=${type}&device=${device}`,
//     })
//   }

//   static async getAdsVideoRightBar(type){
//     return axiosInstance({
//       method: 'GET',
//       url: `/ads-user/run-ads-user?type=${type}`,
//     })
//   }
// }

// export { advertisementService }
