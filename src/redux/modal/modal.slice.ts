import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

const modalSlice = createSlice({
  name: "modal",
  initialState: {
    isOpen: true,
  },
  reducers: {
    setModal: (state, action) => {
      state.isOpen = action.payload;
    },
  },
});

export const { setModal } = modalSlice.actions;
export default modalSlice.reducer;

export const selectModal = (state: RootState) => state.modal.isOpen;
