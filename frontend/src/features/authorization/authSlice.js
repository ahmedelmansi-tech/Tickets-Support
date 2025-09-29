import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const authorizationSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {},
});

export default authorizationSlice.reducer;
