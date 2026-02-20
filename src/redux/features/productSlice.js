import  { createSlice , createAsyncThunk } from "@reduxjs/toolkit"
import { getAllProducts  , getProduct} from "@/api/productApi" 


export const fetchProducts = createAsyncThunk(
  "product/fetchProducts",
  async ()=>{
    const data = await getAllProducts()
    return data
  }
)


export const fetchProductBySlug = createAsyncThunk(
    "product/fetchOne",
    async(slug)=>{
        const data = await getProduct(slug)
        return data 
    }
)

const productSlice = createSlice({
    name : "Product",
    initialState :{
        data : [],
        currentProduct:null,
        loading: false,
        error : null,
    },
    reducers:{},
    extraReducers:(builder)=>{
        builder
        //fetch all products
         .addCase(fetchProducts.pending ,(state)=>{
           state.loading = true 
         })
         .addCase(fetchProducts.fulfilled,(state ,action)=>{
           state.loading = false
           state.data = action.payload
         })
         .addCase(fetchProducts.rejected,(state ,action)=>{
            state.loading =false
            state.error = action.error.message
         })
         //fetch single product 
          .addCase(fetchProductBySlug.pending ,(state)=>{
           state.loading = true 
         })
         .addCase(fetchProductBySlug.fulfilled,(state ,action)=>{
           state.loading = false
           state.currentProduct = action.payload.product
         })
         .addCase(fetchProductBySlug.rejected,(state ,action)=>{
            state.loading =false
            state.error = action.error.message
         })
    }
})


export default productSlice.reducer;