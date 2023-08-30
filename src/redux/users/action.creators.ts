import { createAsyncThunk } from "@reduxjs/toolkit";
import { getUsersApi } from "../../api/auth.api";

export const getUsersReq = createAsyncThunk("/users", async (thunkAPI) => {
  console.log("!!!!!!", thunkAPI);
  const response = await getUsersApi();

  console.log("response", response);
  return response.data;
});
