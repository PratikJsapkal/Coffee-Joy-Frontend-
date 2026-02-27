import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { applyCouponApi } from "@/api/couponApi";

// 🔹 Apply Coupon
export const applyCoupon = createAsyncThunk(
  "coupon/apply",
  async (coupon_code, { rejectWithValue }) => {
    try {
      const data = await applyCouponApi(coupon_code);
      return data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Something went wrong"
      );
    }
  }
);

const couponSlice = createSlice({
  name: "coupon",
  initialState: {
    cartAmount: 0,
    discountAmount: 0,
    finalAmount: 0,
    loading: false,
    error: null
  },
  reducers: {
    setCartAmount: (state, action) => {
      state.cartAmount = action.payload;
      state.finalAmount = action.payload; // reset final amount
    },
    clearCoupon: (state) => {
      state.discountAmount = 0;
      state.finalAmount = state.cartAmount;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder

      // 🔄 Pending
      .addCase(applyCoupon.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      // ✅ Success
      .addCase(applyCoupon.fulfilled, (state, action) => {
        state.loading = false;
        state.discountAmount = action.payload.discountAmount;
        state.finalAmount = action.payload.finalAmount;
      })

      // ❌ Failed
      .addCase(applyCoupon.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { setCartAmount, clearCoupon } = couponSlice.actions;
export default couponSlice.reducer;