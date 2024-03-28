import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

export const stateSlice = createSlice({
  name: "state",
  initialState: {
    loading: false,
  },

  reducers: {
    startLoading: (state, action) => {
      state.loading = true;
    },
    finishLoading: (state) => {
      state.loading = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const { startLoading, finishLoading } = stateSlice.actions;
export default stateSlice.reducer;
