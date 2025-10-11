import { configureStore } from "@reduxjs/toolkit";
import authorizationReducer from "../features/authorization/authSlice";
import ticketsReducer from "../features/tickets/ticketsSlice";
import notesReducer from "../features/notes/notesSlice";

export const store = configureStore({
  reducer: {
    auth: authorizationReducer,
    tickets: ticketsReducer,
    notes: notesReducer,
  },
});

// console.log(store.getState());
