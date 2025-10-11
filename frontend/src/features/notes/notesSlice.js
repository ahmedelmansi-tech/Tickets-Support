import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import noteService from "./noteService";

const initialState = {
  comment: [],
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: "",
};

// ----- Get <One> comment
export const getSingleComment = createAsyncThunk(
  "comments/singlecomment",
  async (ticketId, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token;
    try {
      return await noteService.getOnecomment(ticketId, token);
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

export const notesSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    reset: (state) => {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getSingleComment.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSingleComment.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.comment = action.payload;
      })
      .addCase(getSingleComment.rejected, (state, action) => {
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = notesSlice.actions;
export default notesSlice.reducer;
