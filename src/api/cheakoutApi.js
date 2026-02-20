import api from "@/api/axiosInstance"

export const cheakout = async( cheakoutData)=>{
    const response = await api.post("/checkout/preview" ,cheakoutData)
    return response.data
}

export const showCheakout = async(session_id)=>{
    const response = await api.get(`/checkout/preview/${session_id}`)
    return response.data
}