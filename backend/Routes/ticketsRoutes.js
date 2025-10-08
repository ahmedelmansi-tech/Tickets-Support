const express = require("express");
const router = express.Router();

const {
  getTickets,
  getSingleTicket,
  createNewTickets,
  deleteSingleTicket,
  updateSingleTicket,
} = require("../controllers/ticketsController");

//----------protection Func------------//

const { protect } = require("../middleware/authMiddelware");

router.route("/").get(protect, getTickets).post(protect, createNewTickets);
router
  .route("/:id")
  .get(protect, getSingleTicket)
  .delete(protect, deleteSingleTicket)
  .put(protect, updateSingleTicket);

module.exports = router;
