import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authService";

// Parsing user if found
const currentUser = JSON.parse(localStorage.getItem("user"));
//-------------------------------------------//
const initialState = {
  user: currentUser ? currentUser : null,
  isLoading: false,
  isError: false,
  isSuccessRegister: false,
  isSuccessLogin: false,
  message: null,
};

// ASYNCE FUNCTION FOR REGISTRATION
export const registerProcess = createAsyncThunk(
  "auth/register",
  async (theRegisterUser, thunkAPI) => {
    try {
      return await authService.register(theRegisterUser);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// ASYNC FUNC FOR LOGOUT

export const loggingOut = createAsyncThunk("auth/log-out", async () => {
  await authService.logOut();
});

// ASYNCE FUNCTION FOR LOGIN
export const loggingIn = createAsyncThunk(
  "auth/login",
  async (loggedInData, thunkAPI) => {
    try {
      return await authService.logIn(loggedInData);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const authorizationSlice = createSlice({
  name: "verification",
  initialState,
  reducers: {
    reset: (state) => {
      state.isError = false;
      state.isSuccessRegister = false;
      state.isSuccessLogin = false;
      state.isLoading = false;
      // state.user = null;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerProcess.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerProcess.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccessRegister = true;
        state.user = action.payload;
        localStorage.setItem("user", JSON.stringify(action.payload));
      })
      .addCase(registerProcess.rejected, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.isError = true;
        state.message = action.payload;
        localStorage.removeItem("user");
      })
      .addCase(loggingOut.fulfilled, (state) => {
        state.user = null;
        localStorage.removeItem("user");
      })
      .addCase(loggingIn.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loggingIn.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccessLogin = true;
        state.user = action.payload;
        localStorage.setItem("user", JSON.stringify(action.payload));
      })
      .addCase(loggingIn.rejected, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = authorizationSlice.actions;
export default authorizationSlice.reducer;
