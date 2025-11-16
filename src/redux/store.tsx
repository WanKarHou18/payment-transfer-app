// third party
import { configureStore } from "@reduxjs/toolkit";

// this project
import transferReducer from "./slices/TransferSlices";

const store = configureStore({
  reducer: {
    transfer: transferReducer,
  },
});

export default store;
