import api from "@/api/axiosInstance";

export const addToCart = async (productData)=>{
    const response = await  api.post("/cart/addcart" , productData )
    return response.data
}

export const showCart = async (cartProducts)=>{
    const response = await api.get("/cart/getcart",cartProducts)
    return response.data
}

export const updateCart = async ({cart_item_id , quantity})=>{
    const response = await api.put(`/cart/updatecartitem/${cart_item_id}`, {quantity} )
    return response.data
}

export const deleteCart = async (cart_item_id)=>{
    const response = await api.delete(`/cart/removefromcart/${cart_item_id}`)
    return response.data
}