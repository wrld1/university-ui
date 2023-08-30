import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    todoAdded(state, action) {
      const user = action.payload;
      state.user = user;
    },
  },
});

export const { todoAdded } = authSlice.actions;

export default authSlice.reducer;
