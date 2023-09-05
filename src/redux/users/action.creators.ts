import { createAsyncThunk } from "@reduxjs/toolkit";
import { getUsersApi } from "../../api/auth.api";

export const getUsersReq = createAsyncThunk("/lectors/me", async (thunkAPI) => {
  console.log("!!!!!!", thunkAPI);
  const response = await getUsersApi();

  console.log("response", response);
  return response.data;
});
