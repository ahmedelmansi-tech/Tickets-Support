const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const User = require("../models/userModels");

//----------------- JWT --------------------------------//
const jwt = require("jsonwebtoken");
// jwt.sign({} , secret , {options (expiresIn)} )
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

//-----------REGISTER NEW USER ---------------------------//

// @des new user
// @route  api/users
// @access  public

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  // (1) Validates if the name,ps,emai written
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
    res.status(201).json({
      _id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      token: generateToken(newUser._id),
    });
  } else {
    res.status(400);
    throw new Error("incorrect data ");
  }
});

//--------------------------LOG IN---------------------------//

// @des login user
// @route  api/users/login
// @access  public

const signIn = asyncHandler(async (req, res) => {
  const { email, password, name } = req.body;

  // For DEBUGGING

  console.log(`EMAIL > ${email}`);
  console.log(`PS > ${password}`);

  // Cmpare the password by the hashed PS to br Authe

  const loginUser = await User.findOne({ email });

  // For DEBUGGING
  // console.log(await bcrypt.compare(password, loginUser.password));
  // console.log(loginUser);

  // ATHU
  if (loginUser && (await bcrypt.compare(password, loginUser.password))) {
    res.status(200).json({
      sms: `welcome back ${loginUser.name}`,
      email: loginUser.email,
      name: loginUser.name,
      token: generateToken(loginUser._id),
    });
  } else {
    res.status(401);
    throw new Error("user/password might be wrong");
  }
});

//------------------ ME -------------------------------------//

// @des current User
// @route  api/users/me (/me)
// @access  private
const getMe = asyncHandler(async (req, res) => {
  const theCurrentUser = {
    id: req.loggedUser._id,
    name: req.loggedUser.name,
    email: req.loggedUser.email,
  };
  res.status(200).send(theCurrentUser);
});

module.exports = {
  registerUser,
  signIn,
  getMe,
};
