// third party
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// this project
import api from "../../api/TransferApi";

const initialState = {
  transfer: {
    amount: 0,
    recipientName: "",
    note: "",
  },
  accountInformation: {
    balance: 500,
    transactions: [],
  },
  loading: false,
  error: null,
};

// Thunk to fetch transfer info
export const fetchAccountInformationThunk = createAsyncThunk(
  "transfer/fetchAccountInformation",
  async (_, thunkAPI) => {
    try {
      const result = await api.fetchAccountInformation();

      if (result?.status === 0) {
        return thunkAPI.rejectWithValue(result?.data);
      }

      return result?.data || { balance: 0 };
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error?.message);
    }
  }
);

// Top up balance
export const topUpBalanceThunk = createAsyncThunk(
  "transfer/topUpBalance",
  async (payload, thunkAPI) => {
    try {
      const result = await api.topUpBalance(payload);

      if (result?.status === 0) {
        return thunkAPI.rejectWithValue(result?.data);
      }

      return result?.data || { balance: 0 };
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error?.message);
    }
  }
);

export const transferAmountThunk = createAsyncThunk(
  "transfer/transferAmount",
  async (payload, thunkAPI) => {
    try {
      const result = await api.transferAmount(payload);

      if (result?.status === 0) {
        return thunkAPI.rejectWithValue(result?.data);
      }

      return result?.data || { balance: 0 };
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
      state.accountInformation = {
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
      .addCase(fetchAccountInformationThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAccountInformationThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.accountInformation = action.payload;
      })
      .addCase(fetchAccountInformationThunk.rejected, (state, action) => {
        state.loading = false;
        // @ts-ignore
        state.error = action.payload;
      })

      // Transfer Amount
      .addCase(transferAmountThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(transferAmountThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(transferAmountThunk.rejected, (state, action) => {
        state.loading = false;
        // @ts-ignore
        state.error = action.payload;
      })

      // Top Up Balance
      .addCase(topUpBalanceThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(topUpBalanceThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(topUpBalanceThunk.rejected, (state, action) => {
        state.loading = false;
        // @ts-ignore
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
