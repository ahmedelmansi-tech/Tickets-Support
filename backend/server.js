const log = console.log;

const express = require("express");
const dotenv = require("dotenv").config();
const PORT = process.env.PORT || 6666;

const app = express();

app.get("/", (req, res) => {
  res.json({ SMS: "hello" });
});

// ROUTES
app.use("/api/users", require("./Routes/userRoutes"));

app.listen(PORT, () => log(`Server Work on ${PORT}`));
log("SERVER...");
