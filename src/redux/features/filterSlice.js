import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categoryLevel1: "",
  categoryLevel2: "",
  categoryLevel3: "",
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setCategoryLevel1: (state, action) => {
      state.categoryLevel1 = action.payload;
      state.categoryLevel2 = "";
      state.categoryLevel3 = "";
    },
    setCategoryLevel2: (state, action) => {
      state.categoryLevel2 = action.payload;
      state.categoryLevel3 = "";
    },
    setCategoryLevel3: (state, action) => {
      state.categoryLevel3 = action.payload;
    },
    setFiltersFromCategory: (state, action) => {
      const { level1, level2, level3 } = action.payload;
      state.categoryLevel1 = level1;
      state.categoryLevel2 = level2;
      state.categoryLevel3 = level3;
    },
    resetFilters: () => initialState,
  },
});

export const {
  setCategoryLevel1,
  setCategoryLevel2,
  setCategoryLevel3,
  setFiltersFromCategory,
  resetFilters,
} = filterSlice.actions;

export default filterSlice.reducer;
