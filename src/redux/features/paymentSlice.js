import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createPayment } from "@/api/paymentApi";
import { toast } from "react-toastify";



export const createPaymentThunk = createAsyncThunk(
  "payment/createPayment",
  async (paymentData, { rejectWithValue }) => {
    try {
      const res = await createPayment(paymentData);
      return res;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Something went wrong"
      );
    }
  }
);



const paymentSlice = createSlice({
  name: "payment",
  initialState: {
    payments: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder)=>{
    builder 
    .addCase(createPaymentThunk.pending , (state)=>{
        state.loading = true
        state.error = null
    })
    
     .addCase(createPaymentThunk.fulfilled , (state ,action)=>{
        state.loading = false
        state.payments = action.payload
    })

     .addCase(createPaymentThunk.rejected , (state ,action)=>{
        state.loading = false 
        state.error = action.payload
    })

  }
})


export default paymentSlice.reducer