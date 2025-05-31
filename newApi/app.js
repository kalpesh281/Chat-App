const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("Hello from the API!");
});

const PORT = process.env.PORT || 5006;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
