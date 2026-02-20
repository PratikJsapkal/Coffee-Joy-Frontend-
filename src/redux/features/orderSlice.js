import { createSlice , createAsyncThunk } from "@reduxjs/toolkit";
import { showOrders } from "@/api/ordersApi";


export const showUserOrdersThunk = createAsyncThunk(
    "order/showUserOrder",
     async(_, {rejectWithValue})=>{
        try {
            const res = await showOrders()
            return res
        } catch (error) {
          return rejectWithValue(
             error.response?.data?.message || "Orders not found"
          )  
        }
     }
)


const orderSlice = createSlice({
    name : "orders",
    initialState : {
        orders : [],
        loading : false,
        error :null
    },
    reducers:{},
    extraReducers : (builder)=>{
        builder

        .addCase(showUserOrdersThunk.pending ,(state)=>{
            state.loading = true 
            state.error = null
        })

        .addCase(showUserOrdersThunk.fulfilled ,(state , action)=>{
            state.loading = false 
            state.orders = action.payload
        })

        .addCase(showUserOrdersThunk.rejected ,(state , action)=>{
            state.loading = false 
            state.error = action.payload
        })
    }
})

export default orderSlice.reducer