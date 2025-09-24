const express = require("express");
const router = express.Router();
const {
  gettingUser,
  registerUser,
} = require("../controllers/routesController");
router.post("/", gettingUser);
router.post("/login", registerUser);

module.exports = router;
