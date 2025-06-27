import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { CssBaseline } from "@mui/material";
import { Provider } from "react-redux";
import { store } from "./redux/store.js";
import {
  NotificationProvider,
  NotificationPortal,
} from "ios-notification-stack";
import "ios-notification-stack/dist/style.css";

createRoot(document.getElementById("root")).render(
  <>
    <Provider store={store}>
      <NotificationProvider
        position="top-center"
        width="350px"
        cardHeight="80px"
        cardSpacing={90}
        stackOffset={3}
        zIndex={9999}
        duration={5000} 
        actionButton="Mute"
        customColors={{
          error: "rgb(245, 176, 176)", 
          success: "rgb(34, 197, 94)", 
          warning: "rgb(250, 204, 21)", 
          info: "rgb(79, 70, 229)",
        }}
      >
        <CssBaseline />
        <App />
        <NotificationPortal />
      </NotificationProvider>
    </Provider>
  </>
);
