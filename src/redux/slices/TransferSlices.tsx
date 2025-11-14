import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/TransferApi";

const initialState = {
  transfer: {
    amount: 0,
  },
  accountInformation: {},
  loading: false,
  error: null,
};

// Thunk to fetch transfer info
export const fetchAccountInformation = createAsyncThunk(
  "transfer/fetchAccountInformation",
  async (_, thunkAPI) => {
    try {
      const result = await api.fetchAccountInformation();
      return result;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error?.message);
    }
  }
);

const transferSlice = createSlice({
  name: "transfer",
  initialState,
  reducers: {
    updateTransferDetail: (state, action) => {
      state.transfer = {
        ...state.transfer,
        ...action.payload,
      };
    },

    clearTransferDetail: (state) => {
      state.transfer = initialState.transfer;
    },

    updateAccountInformation: (state, action) => {
      state.transfer = {
        ...state.accountInformation,
        ...action.payload,
      };
    },

    clearAccountInformation: (state) => {
      state.accountInformation = initialState.accountInformation;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAccountInformation.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAccountInformation.fulfilled, (state, action) => {
        state.loading = false;
        state.accountInformation = action.payload;
      })
      .addCase(fetchAccountInformation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {
  updateTransferDetail,
  clearTransferDetail,
  updateAccountInformation,
  clearAccountInformation,
} = transferSlice.actions;

export default transferSlice.reducer;
