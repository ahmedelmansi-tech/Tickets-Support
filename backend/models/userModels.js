const mongose = require("mongoose");

const userSchema = mongose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please  fill in the name"],
    },
    password: {
      type: String,
      required: [true, "Please  fill in the password"],
    },
    email: {
      type: String,
      required: [true, "Please  fill in the password"],
      unique: true,
    },
    isAdmine: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  { timestamp: true }
);

module.exports = mongose.model("User", userSchema);
