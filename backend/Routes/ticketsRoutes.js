const express = require("express");
const router = express.Router();

// Linking Notes Route to Tickets
const noteRouter = require("./noteRoutes");

router.use("/:id/notes", noteRouter);

const {
  getTickets,
  getSingleTicket,
  createNewTickets,
  deleteSingleTicket,
  updateSingleTicket,
} = require("../controllers/ticketsController");

//----------protection Func------------//
const { protect } = require("../middleware/authMiddelware");

// --------- Routing ________<Tickets>_________//

router.route("/").get(protect, getTickets).post(protect, createNewTickets);
router
  .route("/:id")
  .get(protect, getSingleTicket)
  .delete(protect, deleteSingleTicket)
  .put(protect, updateSingleTicket);

module.exports = router;
