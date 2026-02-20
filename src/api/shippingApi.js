import api from "@/api/axiosInstance"

export const addAddress = async (shipAddress)=>{
    const response = await api.post("/shipping-address/add",shipAddress)
    return response.data
}

export const showAddress = async()=>{
    const response = await api.get("/shipping-address/getAdd")
    return response.data
}

export const updateAddress = async(updatedAddress)=>{
    const response = await api.put(`/shipping-address/updateAdd/${updatedAddress.id}` ,updatedAddress)
    return response.data
}

export const deleteAddress = async(id)=>{
    const response = await api.delete(`/shipping-address/deleteAdd/${id}`)
    return response.data
}
