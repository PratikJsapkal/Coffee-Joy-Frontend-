import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getEligibleCoupons, applyCouponApi } from "@/api/couponApi";

// 🔹 Fetch Eligible Coupons
export const fetchEligibleCoupons = createAsyncThunk(
  "coupon/fetchEligible",
  async (_, { rejectWithValue }) => {
    try {
      const data = await getEligibleCoupons();
      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Error");
    }
  }
);

// 🔹 Apply Coupon
export const applyCoupon = createAsyncThunk(
  "coupon/apply",
  async (coupon_code, { rejectWithValue }) => {
    try {
      const data = await applyCouponApi(coupon_code);
      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Error");
    }
  }
);

const couponSlice = createSlice({
  name: "coupon",
  initialState: {
    coupons: [],
    cartAmount: 0,
    discountAmount: 0,
    finalAmount: 0,
    loading: false,
    error: null
  },
  reducers: {
    clearCoupon: (state) => {
      state.discountAmount = 0;
      state.finalAmount = state.cartAmount;
    }
  },
  extraReducers: (builder) => {
    builder

      // Fetch Eligible
      .addCase(fetchEligibleCoupons.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchEligibleCoupons.fulfilled, (state, action) => {
        state.loading = false;
        state.coupons = action.payload.coupons;
        state.cartAmount = action.payload.cartAmount;
        state.finalAmount = action.payload.cartAmount;
      })
      .addCase(fetchEligibleCoupons.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Apply Coupon
      .addCase(applyCoupon.fulfilled, (state, action) => {
        state.discountAmount = action.payload.discountAmount;
        state.finalAmount = action.payload.finalAmount;
      })
      .addCase(applyCoupon.rejected, (state, action) => {
        state.error = action.payload;
      });
  }
});

export const { clearCoupon } = couponSlice.actions;
export default couponSlice.reducer;
