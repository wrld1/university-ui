import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth/auth.slice";
import usersSlice from "./users/users.slice";
import dataSlice from "./data/data.slice";
import modalSlice from "./modal/modal.slice";
import lectorsSlice from "./lectors/lectors.slice";
import coursesSlice from "./courses/courses.slice";
import studentsSlice from "./students/students.slice";
import groupsSlice from "./groups/groups.slice";
import searchSlice from "./search/search.slice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    users: usersSlice,
    data: dataSlice,
    modal: modalSlice,
    lectors: lectorsSlice,
    courses: coursesSlice,
    students: studentsSlice,
    groups: groupsSlice,
    search: searchSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
