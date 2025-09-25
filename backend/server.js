const log = console.log;

const express = require("express");
const app = express();
const colors = require("colors");
const dotenv = require("dotenv").config();
const PORT = process.env.PORT || 6666;
// ERROR HANDLERFUNC MIDDELWARE
const { errorHandler } = require("./middleware/errorMiddleware");

//---------CONECTION FUNC---------------------------
const connectDB = require("./config/db");
connectDB();

// app.get("/", (req, res) => {
//   res.json({ SMS: "hello" });
// });

// PARSING BODY REQ
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ROUTES
app.use("/api/users", require("./Routes/userRoutes"));
app.use(errorHandler);

// LISTINING TO THE PORT
app.listen(PORT, () => log(`Server Work on ${PORT}`));
