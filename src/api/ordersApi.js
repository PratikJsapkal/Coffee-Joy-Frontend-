import api from "@/api/axiosInstance"

export const showOrders = async()=>{
   const resposnse = await api.get("/orders/my-order")
   return resposnse.data
}