import api from "@/api/axiosInstance";

// ---------------------- USER SUBSCRIPTION ----------------------

// Get all available plans
export const getAllPlans = async () => {
  const response = await api.get("/subscription/getAllPlans");
  return response.data;
};

//planybyid

export const getPlanById = async (id) => {
  const response = await api.get(`/subscription/plans/${id}`);
  return response.data;
};


// ✅ Get active plans by category
export const getActivePlans = async (category) => {
  const response = await api.get(`/subscription/plans?category=${category}`);
  return response.data;
};

// ✅ Get all subscribable products (optionally filtered by category)
export const getSubscribableProducts = async (category) => {
  let url = "/subscription/products";
  if (category) url += `?category=${category}`;
  const response = await api.get(url);
  return response.data;
};

export const previewSubscription = async (data) => {
  const response = await api.post("/subscription/preview", data);
  return response.data;
};

// Get my subscriptions
export const getMySubscriptions = async () => {
  const response = await api.get("/subscription/mySubscription");
  return response.data;
};

// Direct subscribe
export const directSubscribe = async (data) => {
  const response = await api.post("/subscription/direct-subscribe", data);
  return response.data;
};

// Pause subscription
export const pauseSubscription = async (id) => {
  const response = await api.post(`/subscription/${id}/pause`);
  return response.data;
};

// Resume subscription
export const resumeSubscription = async (id) => {
  const response = await api.post(`/subscription/${id}/resume`);
  return response.data;
};

// Cancel subscription
export const cancelSubscription = async (id) => {
  const response = await api.post(`/subscription/${id}/cancel`);
  return response.data;
};

// Renew subscription
export const renewSubscription = async (id) => {
  const response = await api.post(`/subscription/${id}/renew`);
  return response.data;
};
