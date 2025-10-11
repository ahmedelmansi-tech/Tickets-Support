const expressAsyncHandler = require("express-async-handler");
const Tickets = require("../models/ticketsModel");
const User = require("../models/userModels");
// -----------   CREATE TICKETS ----------  //
// @POST
// api/tickets/
// Private
const createNewTickets = expressAsyncHandler(async (req, res) => {
  const { product, description } = req.body;

  if (!product || !description) {
    res.status(400);
    throw new Error("You Shuold Add Product");
  }
  const { id } = req.loggedUser;

  const newTicket = await Tickets.create({
    product,
    description,
    user: id,
  });
  res.status(201).json({ message: "Ticket is Created", newTicket });
});

// -----------   GET TICKETS ----------  //

// @GET All Tickets
// api/tickets/
// Private
const getTickets = expressAsyncHandler(async (req, res) => {
  const { id } = req.loggedUser;
  const currentUser = await User.findById(id);

  if (!currentUser) {
    res.status(401);
    throw new Error("not authorized");
  }

  const myTickets = await Tickets.find({ user: id });

  res.status(200).json(myTickets);
});

// @GET Single Tickets
// api/tickets/:id
// Private

const getSingleTicket = expressAsyncHandler(async (req, res) => {
  const { id } = req.loggedUser;

  const currentUser = await User.findById(id);

  if (!currentUser) {
    res.status(401);
    throw new Error("Not Authorized");
  }

  // console.log(req.params.id);
  const specialTicket = await Tickets.findById(req.params.id);

  //   Check is the Ticket Doesn't Exist
  if (!specialTicket) {
    res.status(404);
    throw new Error("Ticket Not Found");
  }

  // Check For Authoraization
  if (specialTicket.user.toString() !== id) {
    res.status(401);
    throw new Error("Not Authorized");
  }

  res.status(200).json(specialTicket);
});

// @DELETE Single Tickets
// api/tickets/:id
// Private

const deleteSingleTicket = expressAsyncHandler(async (req, res) => {
  const { id } = req.loggedUser;

  const currentUser = await User.findById(id);

  if (!currentUser) {
    res.status(401);
    throw new Error("Not Authorized");
  }

  const specialDeletedTicket = await Tickets.findById(req.params.id);

  //   Check is the Ticket Doesn't Exist
  if (!specialDeletedTicket) {
    res.status(404);
    throw new Error("Ticket Not Found");
  }

  // Check For Authoraization
  if (specialDeletedTicket.user.toString() !== id) {
    res.status(401);
    throw new Error("Not Authorized");
  }

  //   .remove() method deprecated  V6 >=
  await specialDeletedTicket.deleteOne();

  //-------------Or Another Method-------------------------------//
  // await Tickets.findByIdAndDelete(req.params.id)

  res
    .status(200)
    .json({ success: true, message: "ticket deleted successfuly" });
});

// @UPDATE   Single Tickets
// (PUT) api/tickets/:id
// Private

const updateSingleTicket = expressAsyncHandler(async (req, res) => {
  const { id } = req.loggedUser;

  const currentUser = await User.findById(id);

  if (!currentUser) {
    res.status(401);
    throw new Error("Not Authorized");
  }

  const specialUpdatedTicket = await Tickets.findById(req.params.id);

  //   Check is the Ticket Doesn't Exist
  if (!specialUpdatedTicket) {
    res.status(404);
    throw new Error("Ticket Not Found");
  }

  // Check For Authoraization
  if (specialUpdatedTicket.user.toString() !== id) {
    res.status(401);
    throw new Error("Not Authorized");
  }

  const updatedVersionTicket = await Tickets.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.status(200).json(updatedVersionTicket);
});

module.exports = {
  getTickets,
  getSingleTicket,
  createNewTickets,
  deleteSingleTicket,
  updateSingleTicket,
};
