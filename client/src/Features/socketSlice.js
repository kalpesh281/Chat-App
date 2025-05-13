import { createSlice } from "@reduxjs/toolkit";

const socketSlice = createSlice({
  name: "socket",
  initialState: {
    connected: false,
    id: null,
  },
  reducers: {
    updateSocketStatus: (state, action) => {
      state.connected = action.payload.connected;
      state.id = action.payload.id;
    },
  },
});

export const { updateSocketStatus } = socketSlice.actions;
export default socketSlice.reducer;
