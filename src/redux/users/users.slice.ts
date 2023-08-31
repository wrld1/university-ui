import { createSlice } from "@reduxjs/toolkit";
import { getUsersReq } from "./action.creators";

const initialState = {
  list: [],
  loading: false,
};

const usersSlice = createSlice({
  name: "users",
  initialState: initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(getUsersReq.pending, (state, action) => {
        console.log(state);
        console.log(action);
        state.loading = true;
      })
      .addCase(getUsersReq.fulfilled, (state, action) => {
        console.log("result list", action);
        const newEntities = {};
        // action.payload.forEach(todo => {
        //   newEntities[todo.id] = todo
        // })
        // state.entities = newEntities
        state.loading = false;
      });
  },
});

// export const {} = usersSlice.actions;

export default usersSlice.reducer;
