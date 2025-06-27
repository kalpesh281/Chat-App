import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import authSlice from "./reducers/authSlice";
import adminReducer from "./reducers/adminSlice";

const authPersistConfig = {
  key: "auth",
  storage,
  whitelist: ["user", "isAuthenticated", "loader"],
};

const adminPersistConfig = {
  key: "admin",
  storage,
  whitelist: ["dashboardStats", "users", "groups", "messages"],
};

const persistedAuthReducer = persistReducer(
  authPersistConfig,
  authSlice.reducer
);

const persistedAdminReducer = persistReducer(
  adminPersistConfig,
  adminReducer
);

const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
    admin: persistedAdminReducer,
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

// Export as named exports
export { store, persistor };
