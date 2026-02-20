import api from '@/api/axiosInstance'


export const signup = async (userData)=>{
    const response = await api.post("/auth/register",userData)
    return response.data
}

export const login = async (userData)=>{
    const response = await api.post("/auth/login" , userData)
    return response.data
}

export const verifyOtp = async (data)=>{
    const response = await api.post("/auth/verify-otp",data)
    return response.data
}

export const resendOtp = async (resendotp)=>{
    const response = await api.post("/auth/resend-otp", resendotp)
    return response.data
}

export const forgetPassword = async (data)=>{
    const response = await api.post("/auth/forgot-password",data)
    return response.data
}
export const resetPassword = async (newPassword)=>{
    const response = await api.post("/auth/reset-password",newPassword)
    return response.data
}

export const userInfo = async ()=>{
    const response = await api.get("/auth/me")
    return response.data
}

export const userLogOut = async()=>{
    const response = await api.delete("/auth/logout")
    return response
} 

export const changePassword = async(changedPass)=>{
    const response = await api.post("/auth/change-password" ,changedPass)
    return response
} 

// seller verify otp
export const sellerVerify = async(otpCode)=>{
    const response = await api.post("/auth/seller/login/verify-otp", otpCode)
    return response.data
}