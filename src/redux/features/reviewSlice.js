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


// ================= MARK HELPFUL =================
export const markReviewHelpful = createAsyncThunk(
    "reviews/markReviewHelpful",
    async (reviewId, thunkAPI) => {
        try {
            await reviewApi.markHelpful(reviewId)
            return reviewId
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data?.message)
        }
    }
)



// ================= SLICE =================
const reviewSlice = createSlice({
    name: "reviews",
    initialState: {
        reviews: [],
        summary: {},
        canReview: false,
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder

        // GET REVIEWS
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

    

.addCase(checkCanReview.fulfilled, (state, action) => {
  state.canReview = action.payload.canReview
})

        // SUMMARY
        .addCase(getReviewSummary.fulfilled, (state, action) => {
            state.summary = action.payload
        })

        // DELETE
        .addCase(removeReview.fulfilled, (state, action) => {
            state.reviews = state.reviews.filter(
                (review) => review.id !== action.payload
            )
        })
    }
})

export default reviewSlice.reducer