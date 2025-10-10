import { configureStore } from "@reduxjs/toolkit";
import authorizationReducer from "../features/authorization/authSlice";
import ticketsSlice from "../features/tickets/ticketsSlice";
export const store = configureStore({
  reducer: {
    auth: authorizationReducer,
    tickets: ticketsSlice,
  },
});

// console.log(store.getState());
