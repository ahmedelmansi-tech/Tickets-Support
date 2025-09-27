const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModels");

const protection = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Extract the token from the Bearer word
      token = req.headers.authorization.split(" ")[1];

      // Verifiy the token jwt.verify(token , shhhhhh secret)
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Get USER FROM TOKEN
      req.user = await User.findById(decoded.id).select("-password");

      next();
    } catch (error) {
      console.log(error);
      res.status(401);
      throw new Error("not Authorized");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("not Authorized");
  }
});

module.exports = { protection };
