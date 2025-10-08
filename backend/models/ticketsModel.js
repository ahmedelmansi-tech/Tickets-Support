const mongoose = require("mongoose");

const ticketSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    product: {
      type: String,
      required: [true, "Please add a product"],
      enum: ["iphone", "Macbook", "iPad", "iMac"],
    },
    description: {
      type: String,
      required: [true, "Please add a description of the issue"],
    },
    status: {
      type: String,
      enum: ["new", "open", "closed"],
      default: "new",
    },
  },
  { timestamp: true }
);

module.exports = mongoose.model("Tickets", ticketSchema);
