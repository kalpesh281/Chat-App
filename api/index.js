const express = require("express");
const ConnectDB = require("./Config/Db");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const app = express();
dotenv = require("dotenv");
dotenv.config();
const PORT = process.env.PORT;

const registerRoute = require("./Routes/registerRoute");

app.use(express.json());
app.use(cookieParser());




app.use("/api/v1/auth",registerRoute)

ConnectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`✅ Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ DB Connection failed:", err);
  });