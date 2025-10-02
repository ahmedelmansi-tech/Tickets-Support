import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authService";

//--------Auth Service fun ---------------//
// import authService from "./authService";

//-------------------------------------------//
const initialState = {
  user: null,
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: null,
};

// ASYNCE FUNCTION FOR REGISTRATION
export const registerProcess = createAsyncThunk(
  "auth/register",
  async (theRegisterUser, thunkAPI) => {
    // console.log(await authService.register(theRegisterUser));

    try {
      return await authService.register(theRegisterUser);
    } catch (error) {
      const message =
        (error.response.data &&
          error.response &&
          error.response.data.caution) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// ASYNCE FUNCTION FOR LOGIN
export const loggingIn = createAsyncThunk("auth/login", async (_, thunkAPI) => {
  console.log(_);
});

const authorizationSlice = createSlice({
  name: "verification",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerProcess.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerProcess.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
        localStorage.setItem("user", JSON.stringify(action.payload));
      })
      .addCase(registerProcess.rejected, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.isError = true;
        state.message = action.payload;
        localStorage.removeItem("user");
      });
  },
});

export default authorizationSlice.reducer;
