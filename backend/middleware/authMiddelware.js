const jwt = require("jsonwebtoken");
const User = require("../models/userModels");
const asyncHandler = require("express-async-handler");

const protect = asyncHandler(async (req, res, next) => {
  let token;
  try {
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];

      // Decoding to verify
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // GET USER FROM Token And put it as a property in the REQ
      req.loggedUser = await User.findById(decoded.id).select("-password");
      console.log(req.loggedUser);
      next();
    } else {
      res.status(401);
      throw new Error("Not Authorized");
    }

    if (!token) {
      res.status(401);
      throw new Error("Not Authorized");
    }
  } catch (error) {
    res.status(401);
    throw new Error("Not Authorized");
  }
});

module.exports = { protect };
