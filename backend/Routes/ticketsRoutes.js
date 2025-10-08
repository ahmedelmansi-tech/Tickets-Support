const express = require("express");
const router = express.Router();

const {
  getTickets,
  createNewTickets,
} = require("../controllers/ticketsController");

//----------protection Func------------//

const { protect } = require("../middleware/authMiddelware");

router.route("/").get(protect, getTickets).post(protect, createNewTickets);

module.exports = router;
