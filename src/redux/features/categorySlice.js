import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  activeCategory: "all", // matches "All Categories"
}

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    setActiveCategory(state, action) {
      state.activeCategory = action.payload
    },
  }, 
})

export const { setActiveCategory } = categorySlice.actions
export default categorySlice.reducer
