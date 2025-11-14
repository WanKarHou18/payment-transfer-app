import { configureStore } from "@reduxjs/toolkit";
import transferReducer from "./slices/TransferSlices";

const store = configureStore({
  reducer: {
    transfer: transferReducer,
  },
});

export default store;
