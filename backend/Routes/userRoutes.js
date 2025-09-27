const express = require("express");
const router = express.Router();
const {
  signIn,
  registerUser,
  getMe,
} = require("../controllers/userController");

// PROTECTION MIDDELWARE

const { protect } = require("../middleware/authMiddelware");

router.post("/", registerUser);
router.post("/login", signIn);
router.get("/me", protect, getMe);

module.exports = router;
