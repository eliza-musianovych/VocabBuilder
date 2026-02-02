import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { Category } from "../../types/wordTypes";

interface CategoriesState {
    items: Category[],
    isLoading: boolean
    error: string | null,
};

const initialState: CategoriesState = {
    items: [],
    isLoading: false,
    error: null,
};

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    setCategories(state, action: PayloadAction<Category[]>) {
      state.items = action.payload
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload
    },
  },
})

export const { setCategories, setLoading, setError } =
  categoriesSlice.actions
export default categoriesSlice.reducer
