const express = require("express");
const router = express.Router({ mergeParams: true });

const { protect } = require("../middleware/authMiddelware");
const { getNotes, addNotes } = require("../controllers/noteControllers");

router.route("/").get(protect, getNotes).post(protect, addNotes);

module.exports = router;
