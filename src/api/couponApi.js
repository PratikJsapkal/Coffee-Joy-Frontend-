import api from "@/api/axiosInstance";

// ✅ Apply coupon
export const applyCouponApi = async (data) => {
  const res = await api.post("/coupon/apply", data);
  return res.data;
};