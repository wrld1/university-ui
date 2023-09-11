import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

const coursesSlice = createSlice({
  name: "courses",
  initialState: {
    rawData: [],
    pageData: [],
  },
  reducers: {
    setCoursePageData: (state, action) => {
      state.pageData = action.payload;
    },
    setCourseApiData: (state, action) => {
      state.rawData = action.payload;
    },
  },
});

export const { setCoursePageData, setCourseApiData } = coursesSlice.actions;
export default coursesSlice.reducer;

export const selectCoursePageData = (state: RootState) =>
  state.courses.pageData;
export const selectCourseApiData = (state: RootState) => state.courses.rawData;
