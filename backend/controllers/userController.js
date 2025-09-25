const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const User = require("../models/userModels");

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  // (1) Vaidates if the name,ps,emai written
  if (!name || !password || !email) {
    // create Error Handler instead
    // return res.status(400).json({
    //   SMS: "Fill All The Fields ",
    // });
    res.status(400);
    throw new Error("Missing Feild");
  }

  // (2) Find if exists
  const userExistes = await User.findOne({ email });
  if (userExistes) {
    res.status(400);
    throw new Error("User Already Exists");
  }

  // (3) Hashing the PS
  const salt = await bcrypt.genSalt(10);
  const hashedPS = await bcrypt.hash(password, salt);

  // (4) creating the user
  const newUser = await User.create({
    name,
    email,
    password: hashedPS,
  });

  // (5) now the user created everything is good and something is created  201

  if (newUser) {
    res.status(201).json(newUser);
  } else {
    res.status(400);
    throw new Error("incorrect data ");
  }
  res.json("REGISTER  USER ROUTE  .....");
});

//--------------------------------------------------------
const gettingUser = asyncHandler(async (req, res) => {
  res.json("GETTING USERS .....");
});

module.exports = {
  registerUser,
  gettingUser,
};
