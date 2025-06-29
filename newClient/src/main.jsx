import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { CssBaseline } from "@mui/material";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import { store, persistor } from "./redux/store.js";
import { Toaster } from "react-hot-toast";

createRoot(document.getElementById("root")).render(
  <>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <CssBaseline />
        <App />
        <Toaster
          position="bottom-center"
          toastOptions={{
            style: {
              padding: "16px 24px",
              minWidth: "300px",
              fontSize: "1rem",
            },
            success: {
              style: { background: "rgb(34, 197, 94)", color: "#fff" },
            },
            error: {
              style: { background: "rgb(245, 176, 176)", color: "#222" },
            },
            loading: {
              style: { background: "rgb(59, 130, 246)", color: "#fff" },
            },
            warning: {
              style: { background: "rgb(251, 191, 36)", color: "#222" },
            },
            duration: 3000,
          }}
        />
      </PersistGate>
    </Provider>
  </>
);
