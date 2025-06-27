import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { CssBaseline } from "@mui/material";
import { Provider } from "react-redux";
import { store } from "./redux/store.js";
import { Toaster } from "react-hot-toast";

createRoot(document.getElementById("root")).render(
  <>
    <Provider store={store}>
      <CssBaseline />
      <App />
      <Toaster
        position="top-right"
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
        }}
      />
    </Provider>
  </>
);

