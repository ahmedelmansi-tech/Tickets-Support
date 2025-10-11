const expressAsyncHandler = require("express-async-handler");
const User = require("../models/userModels");
const Tickets = require("../models/ticketsModel");
const Note = require("../models/noteModel");

// @GET notes
// api/tickets/:id/notes
// Private
const getNotes = expressAsyncHandler(async (req, res) => {
  const { id } = req.loggedUser;
  const currentUser = await User.findById(id);

  if (!currentUser) {
    res.status(401);
    throw new Error("not authorized");
  }

  const myTicket = await Tickets.findById(req.params.id);

  if (myTicket.user.toString() !== id) {
    res.status(401);
    throw new Error("not authorized");
  }

  const notes = await Note.find({ ticket: req.params.id });
  res.status(200).json(notes);
});

// @POST  Add notes
// api/tickets/:id/notes
// Private
const addNotes = expressAsyncHandler(async (req, res) => {
  const { id } = req.loggedUser;
  const currentUser = await User.findById(id);

  if (!currentUser) {
    res.status(401);
    throw new Error("not authorized");
  }

  const myTicket = await Tickets.findById(req.params.id);

  if (myTicket.user.toString() !== id) {
    res.status(401);
    throw new Error("not authorized");
  }

  const newNote = await Note.create({
    comment: req.body.text,
    isStaff: false,
    ticket: req.params.id,
    user: id,
  });
  res.status(200).json(newNote);
});

module.exports = {
  getNotes,
  addNotes,
};
