// test.js
const mongoose = require("mongoose");
require("dotenv").config();

(async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Connected to MongoDB:", conn.connection.host);
    process.exit(0); // exit success
  } catch (err) {
    console.error("❌ Connection error:", err.message);
    process.exit(1); // exit with error
  }
})();
