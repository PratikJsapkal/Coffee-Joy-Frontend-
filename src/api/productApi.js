import api from "./axiosInstance";

export const  getAllProducts = async ()=>{
    const response = await api.get("/products/all-products");
    return response.data
};

export const getProduct = async (slug)=>{
    const response = await api.get(`/products/get-product/${slug}`)
    return response.data
}