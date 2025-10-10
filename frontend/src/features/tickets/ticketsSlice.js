import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import ticketsServices from "./ticketsService";
const initialState = {
  tickets: [],
  ticket: {},
  isError: false,
  isSuccess: false,
  isPending: false,
  message: "",
};

// Create New Ticket
export const createNewTicket = createAsyncThunk(
  "tickets/CreateNew",
  async (ticketData, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token;

    try {
      return await ticketsServices.create(ticketData, token);
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

// Create New User All Tickets
export const getAllTickets = createAsyncThunk(
  "tickets/getAll",
  async (_, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token;

    try {
      return await ticketsServices.getAll(token);
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

// ----------- Slice Body ---------------- //

export const ticketsSlice = createSlice({
  name: "tickets",
  initialState,
  reducers: {
    reset: (state) => {
      console.log("RESET ACTION");
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createNewTicket.pending, (state) => {
        state.isPending = true;
      })
      .addCase(createNewTicket.fulfilled, (state, action) => {
        state.isPending = false;
        state.isSuccess = true;
      })
      .addCase(createNewTicket.rejected, (state, action) => {
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getAllTickets.pending, (state) => {
        state.isPending = true;
      })
      .addCase(getAllTickets.fulfilled, (state, action) => {
        state.isPending = false;
        state.isSuccess = true;
        state.tickets = action.payload;
      })
      .addCase(getAllTickets.rejected, (state, action) => {
        state.isSuccess = false;
        state.message = action.payload;
      });
  },
});

export const { reset } = ticketsSlice.actions;
export default ticketsSlice.reducer;
