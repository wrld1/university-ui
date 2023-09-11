import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

const lectorsSlice = createSlice({
  name: "lectors",
  initialState: {
    rawData: [],
    pageData: [],
  },
  reducers: {
    setLectorPageData: (state, action) => {
      state.pageData = action.payload;
    },
    setLectorApiData: (state, action) => {
      state.rawData = action.payload;
    },
  },
});

export const { setLectorPageData, setLectorApiData } = lectorsSlice.actions;
export default lectorsSlice.reducer;

export const selectLectorPageData = (state: RootState) =>
  state.lectors.pageData;
export const selectLectorApiData = (state: RootState) => state.lectors.rawData;
