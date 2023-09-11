import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

const studentsSlice = createSlice({
  name: "students",
  initialState: {
    rawData: [],
    pageData: [],
  },
  reducers: {
    setStudentPageData: (state, action) => {
      state.pageData = action.payload;
    },
    setStudentApiData: (state, action) => {
      state.rawData = action.payload;
    },
  },
});

export const { setStudentPageData, setStudentApiData } = studentsSlice.actions;
export default studentsSlice.reducer;

export const selectStudentPageData = (state: RootState) =>
  state.students.pageData;
export const selectStudentApiData = (state: RootState) =>
  state.students.rawData;
