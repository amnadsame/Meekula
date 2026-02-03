// import { axiosInstance } from './api'

// class businessService {
//   static async searchBusinesses(data) {
//     return axiosInstance({
//       method: 'POST',
//       url: 'businesses/search-businesses',
//       data: {
//         keyword: data?.keyword,
//         suggest: data?.suggest,
//         lng: data?.lng,
//         lat: data?.lat,
//         page: data?.page,
//         limit: data?.limit,
//       },
//     })
//   }

//   static async getMyBusinesses(data) {
//     return axiosInstance({
//       method: 'GET',
//       url: 'businesses',
//       params: {
//         page: data?.page,
//         pageSize: data?.pageSize,
//       },
//     })
//   }

//   static async createBusiness(data) {
//     return axiosInstance({
//       method: 'POST',
//       url: 'businesses',
//       data: {
//         referralCode: data?.referralCode,
//         type: data?.type,
//         name: data?.name,
//         description: data?.description,
//         openingHours: data?.openingHours,
//         phoneNumber: data?.phoneNumber,
//         email: data?.email,
//         phone: data?.phone,
//         website: data?.website,
//         lat: data?.latLng?.split(',')?.[0],
//         lng: data?.latLng?.split(',')?.[1],
//         address: data?.address,
//       },
//     })
//   }

//   static async updateBusiness(data) {
//     return axiosInstance({
//       method: 'PUT',
//       url: `businesses/${data.id}`,
//       data: {
//         name: data?.name,
//         description: data?.description,
//         openingHours: data?.openingHours,
//         phoneNumber: data?.phoneNumber,
//         email: data?.email,
//         phone: data?.phone,
//         website: data?.website,
//         lat: data?.latLng?.split(',')?.[0],
//         lng: data?.latLng?.split(',')?.[1],
//         address: data?.address,
//       },
//     })
//   }

//   static async getRecentBusinesses(data) {
//     return axiosInstance({
//       method: 'GET',
//       url: 'businesses/recent-business',
//       params: {
//         page: data.page,
//         pageSize: data.pageSize,
//         type: data?.type === 'All' ? null : data?.type,
//         lng: data?.lng,
//         lat: data?.lat,
//       },
//     })
//   }

//   static async getBusinessDetail(data) {
//     return axiosInstance({
//       method: 'GET',
//       url: `businesses/${data?.id}`,
//     })
//   }

//   static async businessUploadFiles(data) {
//     const formData = new FormData()
//     if (data.files?.length) {
//       data.files.forEach((file) => {
//         formData.append('media', file)
//       })
//     }
//     if (data?.mediaId) formData.append('mediaId', data?.mediaId)

//     return axiosInstance({
//       method: 'PUT',
//       url: `businesses/${data?.id}/upload-files`,
//       data: formData,
//     })
//   }

//   static async businessDeleteFile(data) {
//     return axiosInstance({
//       method: 'DELETE',
//       url: `businesses/${data?.id}/delete-file`,
//       params: { mediaId: data?.mediaId },
//     })
//   }

//   static async deleteBusiness(data) {
//     return axiosInstance({
//       method: 'DELETE',
//       url: `businesses/${data?.businessId}`,
//     })
//   }

//   static async updateVisitedBusiness(data) {
//     return axiosInstance({
//       method: 'POST',
//       url: 'businesses/update-visited-business',
//       data: { lat: data?.lat, lng: data?.lng },
//     })
//   }

//   static async getBusinessReview(data) {
//     return axiosInstance({
//       method: 'GET',
//       url: `businesses/${data?.businessId}/business-review`,
//       params: {
//         page: data?.page,
//         pageSize: data?.pageSize,
//       },
//     })
//   }

//   static async sendBusinessReview(data) {
//     return axiosInstance({
//       method: 'POST',
//       url: `businesses/${data?.businessId}/business-review`,
//       data: {
//         reactionType: data?.reactionType,
//         content: data?.content,
//       },
//     })
//   }

//   static async autoTranslationDescription(data) {
//     return axiosInstance({
//       method: 'POST',
//       url: 'businesses/auto-translation-description',
//       data: {
//         language: data?.language,
//         businessId: data?.businessId,
//       },
//     })
//   }

//   static async checkReferralCode(data) {
//     return axiosInstance({
//       method: 'GET',
//       url: 'users/search',
//       params: {
//         keywords: data?.keywords,
//       },
//     })
//   }

//   static async addNoteToMedia(data) {
//     return axiosInstance({
//       method: 'POST',
//       url: 'businesses/add-note-to-media',
//       data: {
//         mediaId: data?._id,
//         note: data?.note,
//       },
//     })
//   }

//   static async saveMenu(data) {
//     return axiosInstance({
//       method: 'POST',
//       url: 'businesses/save-menu',
//       data,
//     })
//   }

//   static async deleteMenu(data) {
//     return axiosInstance({
//       method: 'POST',
//       url: 'businesses/delete-menu',
//       data,
//     })
//   }

//   static async saveCategory(data) {
//     return axiosInstance({
//       method: 'POST',
//       url: 'businesses/save-category',
//       data,
//     })
//   }

//   static async deleteCategory(data) {
//     return axiosInstance({
//       method: 'POST',
//       url: 'businesses/delete-category',
//       data,
//     })
//   }
// }

// export { businessService }
