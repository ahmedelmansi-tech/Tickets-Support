import { configureStore } from "@reduxjs/toolkit";
import authorizationReducer from "../features/authorization/authSlice";
export const store = configureStore({
  reducer: {
    auth: authorizationReducer,
  },
});

// console.log(store.getState());
