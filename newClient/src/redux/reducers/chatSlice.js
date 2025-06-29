import { createSlice } from "@reduxjs/toolkit";
import { getOrSaveFromLocalStorage } from "../../libs/features";
import { NEW_MESSAGE_ALERT } from "../../constant/events";

const initialState = {
  notificationCount: 0,
  newMessageAlert: getOrSaveFromLocalStorage({
    key: NEW_MESSAGE_ALERT,
    get: true,
  }) || [
    {
      chatId: "",
      count: 0,
    },
  ],
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    incrementNotificationCount: (state) => {
      state.notificationCount += 1;
    },
    resetNotificationCount: (state) => {
      state.notificationCount = 0;
    },
    setNewMessageAlert: (state, action) => {
      const chatId = action.payload.chatId;
      const index = state.newMessageAlert.findIndex(
        (item) => item.chatId === chatId
      );
      if (index != -1) {
        state.newMessageAlert[index].count += 1;
      } else {
        state.newMessageAlert.push({
          chatId: chatId,
          count: 1,
        });
      }
    },
    removeNewMessageAlert: (state, action) => {
      const chatId = action.payload.chatId;
      state.newMessageAlert = state.newMessageAlert.filter(
        (item) => item.chatId !== chatId
      );
    },
  },
});

export default chatSlice.reducer;
export const {
  incrementNotificationCount,
  resetNotificationCount,
  setNewMessageAlert,
  removeNewMessageAlert,
} = chatSlice.actions;
