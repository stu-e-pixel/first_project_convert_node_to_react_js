import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import crudReducer from "../features/crud/crudSlice"

export const store = configureStore({
  reducer: {
    auth: authReducer,
    crud:crudReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;