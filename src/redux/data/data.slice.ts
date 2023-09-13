import { createSelector, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { PageType } from "../../types/PageType.type";

const dataSlice = createSlice({
  name: "data",
  initialState: {
    data: [],
    loading: false,
    pageType: "",
  },
  reducers: {
    setData: (state, action) => {
      state.data = action.payload;
    },
    setPageType: (state, action) => {
      state.pageType = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const { setData, setPageType, setLoading } = dataSlice.actions;
export default dataSlice.reducer;

export const selectData = (state: RootState) => state.data.data;
export const selectPageType = createSelector(
  (state: RootState) => state.data.pageType,
  (pageType) => pageType as PageType
);

export const selectLoading = (state: RootState) => state.data.loading;
