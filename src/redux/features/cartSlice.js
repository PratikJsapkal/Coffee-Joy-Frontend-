import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addToCart, showCart , updateCart ,deleteCart } from "@/api/cartApi";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";

// ================= ADD TO CART =================
export const AddToCartThunk = createAsyncThunk(
  "cart/addToCart",
  async (productData, { rejectWithValue }) => {
    try {
      const res = await addToCart(productData);
      return res;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Something went wrong"
      );
    }
  }
);

// ================= SHOW CART PRODUCTS =================
export const showCartProductsThunk = createAsyncThunk(
  "cart/showCartProducts",
  async (_, { rejectWithValue }) => {
    try {
      const res = await showCart();
      return res;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Products could not be fetched"
      );
    }
  }
);


export const updateCartThunk = createAsyncThunk(
  "cart/update",
  async ({cart_item_id , quantity}, { rejectWithValue ,dispatch }) => {
    try {
      await updateCart({ cart_item_id, quantity }); // backend call
      dispatch(showCartProductsThunk())
      return { cart_item_id, quantity }; // return what we updated
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);


export const deleteCartThunk = createAsyncThunk(
    "cart/deleteCart",
     async ({cart_item_id} , {rejectWithValue})=>{
        try {
            await deleteCart(cart_item_id)
            return cart_item_id
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Product not removed from the cart"
            )
        }
     }
)



const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: {cart : []},
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // -------- Add to Cart --------
      .addCase(AddToCartThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(AddToCartThunk.fulfilled, (state, action) => {
        state.loading = false;

        // Optional: check if product already exists
        const existing = state.products.cart.find(
          (p) => p._id === action.payload._id
        );
        if (existing) {
          existing.quantity += action.payload.quantity || 1;
        } else {
          state.products.cart.push(action.payload);
        }
        toast.success("Product added to cart");
      })
      .addCase(AddToCartThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(action.payload || "Failed to add product");
      })

      // -------- Show Cart Products --------
      .addCase(showCartProductsThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(showCartProductsThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload || [];
      })
      .addCase(showCartProductsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      .addCase(updateCartThunk.pending , (state)=>{
        state.loading = true
        state.error = null
      })

      .addCase(updateCartThunk.fulfilled, (state) => {
  state.loading = false;
})


      .addCase(updateCartThunk.rejected , (state , action)=>{
        state.loading = false
        state.error = action.payload
        toast.error(action.payload || "Failed to update cart products");
      })

      .addCase(deleteCartThunk.pending , (state)=>{
        state.loading = true
        state.error = null
      })

      .addCase(deleteCartThunk.fulfilled, (state, action) => {
         state.loading = false;
         state.products.cart = state.products.cart.filter(
         (  item) => item.cart_item_id !== action.payload
      );
})


      .addCase(deleteCartThunk.rejected , (state , action )=>{
        state.loading = false
        state.error = action.payload
      })

  },
});

export default cartSlice.reducer;
