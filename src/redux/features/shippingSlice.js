import { createAsyncThunk ,createSlice } from "@reduxjs/toolkit";
import { addAddress , showAddress ,updateAddress ,deleteAddress} from "@/api/shippingApi";
import { toast } from "react-toastify";


export const addShippingAddressThunk = createAsyncThunk(
    "shipping/addAddress",
    async(shippingAddress , {rejectWithValue})=>{
       try {
         const res = await addAddress(shippingAddress)
         return res 
       } catch (error) {
        return rejectWithValue(
          error.response?.data?.message || "Something went wrong"
        )
       }
    }
)

export const showShippingAddressThunk = createAsyncThunk(
  "shipping/showAddress",
  async(_,{rejectWithValue})=>{
    try {
      const res = await showAddress()
      return res 
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "address not fetched"
      )
    }
  }
)

export const updateShippingAddressThunk = createAsyncThunk(
  "shipping/updateAddress",
  async(updatedAddress,{rejectWithValue})=>{
    try {
      const res = await updateAddress(updatedAddress)
      return res 
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "address not fetched"
      )
    }
  }
)

export const deleteShippingAddressThunk = createAsyncThunk(
  "shipping/deleteAddress",
  async(deletedAddress,{rejectWithValue})=>{
    try {
      const res = await deleteAddress(deletedAddress)
      return res 
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "address not deleted"
      )
    }
  }
)


const shippingSlice = createSlice({
    name:"shipping_address",
    initialState:{
        address : [],
        loading : false,
        error :null,
        isSaved :  false 
    },
    reducers:{},
    extraReducers:(builder)=>{
       builder

       .addCase(addShippingAddressThunk.pending , (state)=>{
        state.loading = true
        state.error = null
       })

       .addCase(addShippingAddressThunk.fulfilled , (state , action)=>{
        state.loading = false
        state.address = action.payload
        state.isSaved = true
        state.error = null
        toast.success("Address Saved")
       })

       .addCase(addShippingAddressThunk.rejected , (state , action)=>{
        state.loading = false
        state.isSaved = false
        state.error = action.payload
       })

       .addCase(showShippingAddressThunk.pending , (state)=>{
        state.loading = true
        state.error = null
       })

       .addCase(showShippingAddressThunk.fulfilled ,(state , action)=>{
        state.loading = false 
        state.address = action.payload
       })

       .addCase(showShippingAddressThunk.rejected ,(state , payload)=>{
        state.loading = false
        state.error = action.payload
       })

       .addCase(updateShippingAddressThunk.pending , (state)=>{
        state.loading = true
        state.error = null
       })

       .addCase(updateShippingAddressThunk.fulfilled , (state , action)=>{
        state.loading = false
         if (state.address?.data?.length) {
    state.address.data[0] = action.payload;
  } else {
    state.address = { data: [action.payload] };
  }
        toast.success("address Updated")
        state.error = null
       })

       .addCase(updateShippingAddressThunk.rejected , (state , action)=>{
        state.loading = false
        state.error = action.payload
       })

       .addCase(deleteShippingAddressThunk.pending , (state)=>{
        state.loading = true
        state.error = null
       })

       .addCase(deleteShippingAddressThunk.fulfilled , (state)=>{
        state.loading = false
        toast.success("address deleted")
       })

       .addCase(deleteShippingAddressThunk.rejected , (state ,action)=>{
        state.loading = false
        state.error = action.payload
        toast.error(action.payload)
       })


    }
})


export default shippingSlice.reducer