const asyncHandler = require("express-async-handler");

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !password || !email) {
    // create Error Handler instead
    // return res.status(400).json({
    //   SMS: "Fill All The Fields ",
    // });
    res.status(400);
    throw new Error("Missing Feild");
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
