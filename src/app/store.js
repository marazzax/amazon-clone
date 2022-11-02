import { configureStore } from "@reduxjs/toolkit";
import basketReducer from "../slices/basketSlice";

//The global store whewre all the things are kept to the basket
export const store = configureStore({
  reducer: {
    basket: basketReducer,
  },
});
