import api from "@/api/axiosInstance"


export const checkCanReview = async (productId) => {
  const res = await api.get(
    `/review/can-review/${productId}`,
    { withCredentials: true }
  )
  return res.data
}

// ================= GET TOP RATED =================
export const fetchTopRated = async () => {
    const response = await api.get("/review/top-rated")
    return response.data
}


// ================= GET REVIEW SUMMARY =================
export const fetchReviewSummary = async (productId) => {
    const response = await api.get(`/review/summary/${productId}`)
    return response.data
}


// ================= GET PRODUCT REVIEWS =================
export const fetchProductReviews = async (productId) => {
    const response = await api.get(`/review/product/${productId}`)
    return response.data
}


// ================= ADD REVIEW =================
export const addReview = async (data) => {
const res = await api.post(
  `/review/add-review`,
  data,
  { withCredentials: true }
)
}


// ================= UPDATE REVIEW =================
export const updateReview = async (reviewId, reviewData) => {
    const response = await api.put(`/review/${reviewId}`, reviewData)
    return response.data
}


// ================= DELETE REVIEW =================
export const deleteReview = async (reviewId) => {
    const response = await api.delete(`/review/${reviewId}`)
    return response.data
}


// ================= MARK HELPFUL =================
export const markHelpful = async (reviewId) => {
    const response = await api.post(`/review/${reviewId}/helpful`)
    return response.data
}