import { configureStore } from "@reduxjs/toolkit";
import stateReducer from "../features/state";

const store = configureStore({
  reducer: {
    stateSlice: stateReducer,
  },
  middleware: getDefaultMiddleware =>
  getDefaultMiddleware({
    serializableCheck: false,
  }),
});

export default store;
