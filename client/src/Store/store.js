import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../Features/authSlice";
import messageReducer from "../Features/messageSlice";
import socketReducer from "../Features/socketSlice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const authPersistConfig = {
  key: "auth",
  storage,
  whitelist: [
    "user",
    "isAuthenticated",
    "otherUsers",
    "selectedUser",
    "onlineUsers",
  ],
};

const messagePersistConfig = {
  key: "message",
  storage,
  whitelist: ["messages"],
};

const socketPersistConfig = {
  key: "socket",
  storage,
  whitelist: ["socket"],
};

const persistedAuthReducer = persistReducer(authPersistConfig, authReducer);
const persistedSocketReducer = socketReducer;

const persistedMessageReducer = persistReducer(
  messagePersistConfig,
  messageReducer
);

const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
    message: persistedMessageReducer,
    socket: persistedSocketReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }),
});

const persistor = persistStore(store);

export { store, persistor };
export default store;
