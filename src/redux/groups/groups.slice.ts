import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

const groupsSlice = createSlice({
  name: "groups",
  initialState: {
    rawData: [],
    pageData: [],
  },
  reducers: {
    setGroupPageData: (state, action) => {
      state.pageData = action.payload;
    },
    setGroupApiData: (state, action) => {
      state.rawData = action.payload;
    },
  },
});

export const { setGroupPageData, setGroupApiData } = groupsSlice.actions;
export default groupsSlice.reducer;

export const selectGroupPageData = (state: RootState) => state.groups.pageData;
export const selectGroupApiData = (state: RootState) => state.groups.rawData;
