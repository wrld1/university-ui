import { createAsyncThunk } from "@reduxjs/toolkit";
import { getUsersApi } from "../../api/auth.api";

export const getUsersReq = createAsyncThunk(
  "/lectors/me",
  async (_, thunkAPI) => {
    try {
      const response = await getUsersApi();
      return response.data;
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || "An error occurred";
      return errorMessage;
    }
  }
);
