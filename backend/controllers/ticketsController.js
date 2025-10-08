const expressAsyncHandler = require("express-async-handler");
const Tickets = require("../models/ticketsModel");
const User = require("../models/userModels");
// -----------   CREATE TICKETS ----------  //
const createNewTickets = expressAsyncHandler(async (req, res) => {
  const { product, description } = req.body;

  if (!product || !description) {
    res.status(400);
    throw new Error("You Shuold Add Product");
  }
  const { id } = req.loggedUser;

  const newTicket = await Tickets.create({
    product: "iphone",
    description: "expensive too much",
    user: id,
  });

  res.status(201).json({ message: "Ticket is Created", newTicket });
});

// -----------   GET TICKETS ----------  //
const getTickets = expressAsyncHandler(async (req, res) => {
  const { id } = req.loggedUser;
  const currentUser = await User.findById(id);

  if (!currentUser) {
    res.status(401);
    throw new Error("not authorized");
  }

  const myTickets = await Tickets.find({ user: currentUser.id });

  res.status(200).json(myTickets);
});

module.exports = {
  getTickets,
  createNewTickets,
};
