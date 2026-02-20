import api from "@/api/axiosInstance";

// ✅ Get eligible coupons
export const getEligibleCoupons = async () => {
  const response = await api.get("/coupons/eligible");
  return response.data;
};

// ✅ Apply coupon
export const applyCouponApi = async (coupon_code) => {
  const response = await api.post("/coupons/apply", { coupon_code });
  return response.data;
};
