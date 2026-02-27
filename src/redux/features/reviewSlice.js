import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import * as reviewApi from "@/api/reviewApi"



export const checkCanReview = createAsyncThunk(
  "reviews/checkCanReview",
  async (productId, thunkAPI) => {
    try {
      return await reviewApi.checkCanReview(productId)
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message)
    }
  }
)


// ================= GET PRODUCT REVIEWS =================
export const getProductReviews = createAsyncThunk(
    "reviews/getProductReviews",
    async (productId, thunkAPI) => {
        try {
            return await reviewApi.fetchProductReviews(productId)
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data?.message)
        }
    }
)


// ================= GET SUMMARY =================
export const getReviewSummary = createAsyncThunk(
    "reviews/getReviewSummary",
    async (productId, thunkAPI) => {
        try {
            return await reviewApi.fetchReviewSummary(productId)
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data?.message)
        }
    }
)


// ================= ADD REVIEW =================
export const createReview = createAsyncThunk(
    "reviews/createReview",
    async (reviewData, thunkAPI) => {
        try {
            return await reviewApi.addReview(reviewData)
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data?.message)
        }
    }
)


// ================= DELETE REVIEW =================
export const removeReview = createAsyncThunk(
    "reviews/removeReview",
    async (reviewId, thunkAPI) => {
        try {
            await reviewApi.deleteReview(reviewId)
            return reviewId
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data?.message)
        }
    }
)


/* ================= MARK HELPFUL ================= */

export const markReviewHelpful = createAsyncThunk(
  "reviews/markHelpful",
  async (reviewId, thunkAPI) => {
    try {
      await reviewApi.markHelpful(reviewId)
      return reviewId
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error?.response?.data?.message || "Failed to mark helpful"
      )
    }
  }
)


export const updateReview = createAsyncThunk(
  "reviews/updateReview",
  async ({ reviewId, rating, comment }, thunkAPI) => {
    try {
      return await reviewApi.updateReview(reviewId, { rating, comment })
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error?.response?.data?.message || "Failed to update review"
      )
    }
  }
)

/* ================= DELETE REVIEW ================= */

export const deleteReview = createAsyncThunk(
  "reviews/deleteReview",
  async (reviewId, thunkAPI) => {
    try {
      await reviewApi.deleteReview(reviewId)
      return reviewId
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error?.response?.data?.message || "Failed to delete review"
      )
    }
  }
)



//* ================= SLICE ================= */

const reviewSlice = createSlice({
  name: "reviews",
  initialState: {
    reviews: [],
    summary: {},
    canReview: false,
    loading: false,
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder

      /* ===== GET REVIEWS ===== */
      .addCase(getProductReviews.pending, (state) => {
        state.loading = true
      })
      .addCase(getProductReviews.fulfilled, (state, action) => {
        state.loading = false
        state.reviews = action.payload
      })
      .addCase(getProductReviews.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })

      /* ===== SUMMARY ===== */
      .addCase(getReviewSummary.fulfilled, (state, action) => {
        state.summary = action.payload
      })

      /* ===== CAN REVIEW ===== */
      .addCase(checkCanReview.fulfilled, (state, action) => {
        state.canReview = action.payload?.canReview ?? false
      })

      /* ===== CREATE ===== */
      .addCase(createReview.fulfilled, (state, action) => {
        state.reviews.unshift(action.payload)
      })

      /* ===== UPDATE ===== */
      .addCase(updateReview.fulfilled, (state, action) => {
        const index = state.reviews.findIndex(
          (r) => r.id === action.payload.id
        )
        if (index !== -1) {
          state.reviews[index] = action.payload
        }
      })

      /* ===== DELETE ===== */
      .addCase(deleteReview.fulfilled, (state, action) => {
        state.reviews = state.reviews.filter(
          (review) => review.id !== action.payload
        )
      })

      /* ===== MARK HELPFUL ===== */
      .addCase(markReviewHelpful.fulfilled, (state, action) => {
        const review = state.reviews.find(
          (r) => r.id === action.payload
        )
        if (review) {
          review.helpful_count = (review.helpful_count || 0) + 1
        }
      })
  }
})

export default reviewSlice.reducer