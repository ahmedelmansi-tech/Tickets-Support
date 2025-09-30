import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: null,
};

// ASYNCE FUNCTION FOR REGISTRATION

export const registration = createAsyncThunk(
  "auth/register",
  async (userInfo, thunkAPI) => {
    console.log(userInfo);
  }
);

// ASYNCE FUNCTION FOR LOGIN

export const loggingIn = createAsyncThunk(
  "auth/login",
  async (userInfo, thunkAPI) => {
    console.log(userInfo);
  }
);

const authorizationSlice = createSlice({
  name: "verification",
  initialState,
  reducers: {},
  extraReducers: (builder) => {},
});

export default authorizationSlice.reducer;
