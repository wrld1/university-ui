import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

const searchSlice = createSlice({
  name: "search",
  initialState: {
    searchvalue: "",
  },
  reducers: {
    setSearchValue: (state, action) => {
      state.searchvalue = action.payload;
    },
  },
});

export const { setSearchValue } = searchSlice.actions;
export default searchSlice.reducer;

export const selectSearchValue = (state: RootState) => state.search.searchvalue;
