import api from "@/api/axiosInstance"
import axios from "axios"

export const createPayment = async (paymentData)=>{
    const response = await api.post("/payment/create",paymentData)
    return  response.data
}