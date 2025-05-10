const express = require("express");
const ConnectDB = require("./Config/Db");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const app = express();
dotenv = require("dotenv");
dotenv.config();
const PORT = process.env.PORT;

const registerRoute = require("./Routes/registerRoute");
const messageRoute = require("./Routes/messageRoute");

app.use(express.json());
app.use(cookieParser());

// CORS setup
app.use(
  cors({
    origin: "http://localhost:5173", 
    credentials: true, 
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

app.use("/api/v1/auth", registerRoute);
app.use("/api/v1/message", messageRoute);

ConnectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`✅ Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ DB Connection failed:", err);
  });