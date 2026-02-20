import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getActivePlans,
  getPlanById,
  getSubscribableProducts,
  previewSubscription,
} from "@/api/subscriptionApi";

// ================= FETCH PLANS =================
export const fetchPlans = createAsyncThunk(
  "subscription/fetchPlans",
  async (category, { rejectWithValue }) => {
    try {
      return await getActivePlans(category);
    } catch (err) {
      return rejectWithValue(err.response?.data?.message);
    }
  }
);

// ================= FETCH PLAN BY ID =================
export const fetchPlanById = createAsyncThunk(
  "subscription/fetchPlanById",
  async (id, { rejectWithValue }) => {
    try {
      return await getPlanById(id);
    } catch (err) {
      return rejectWithValue(err.response?.data?.message);
    }
  }
);

// ================= FETCH PRODUCTS =================
export const fetchSubscribableProducts = createAsyncThunk(
  "subscription/fetchProducts",
  async (category, { rejectWithValue }) => {
    try {
      return await getSubscribableProducts(category);
    } catch (err) {
      return rejectWithValue(err.response?.data?.message);
    }
  }
);

// ================= PREVIEW =================
export const previewSubscriptionThunk = createAsyncThunk(
  "subscription/preview",
  async (payload, { rejectWithValue }) => {
    try {
      return await previewSubscription(payload);
    } catch (err) {
      return rejectWithValue(err.response?.data?.message);
    }
  }
);

const subscriptionSlice = createSlice({
  name: "subscription",
  initialState: {
    plans: [],
    selectedPlan: null,
    products: [],
    selectedProduct: null,
    previewData: null,
    loading: false,
    error: null,
  },
  reducers: {
    setSelectedProduct: (state, action) => {
      state.selectedProduct = action.payload;
    },
    clearSubscriptionState: (state) => {
      state.selectedPlan = null;
      state.selectedProduct = null;
      state.previewData = null;
    },
  },
  extraReducers: (builder) => {
    builder

      // Plans
      .addCase(fetchPlans.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPlans.fulfilled, (state, action) => {
        state.loading = false;
        state.plans = action.payload;
      })
      .addCase(fetchPlans.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Plan by ID
      .addCase(fetchPlanById.fulfilled, (state, action) => {
        state.selectedPlan = action.payload;
      })

      // Products
      .addCase(fetchSubscribableProducts.fulfilled, (state, action) => {
        state.products = action.payload;
      })

      // Preview
      .addCase(previewSubscriptionThunk.fulfilled, (state, action) => {
        state.previewData = action.payload;
      });
  },
});

export const { setSelectedProduct, clearSubscriptionState } =
  subscriptionSlice.actions;

export default subscriptionSlice.reducer;
