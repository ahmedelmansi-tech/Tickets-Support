import axios from "axios";
const END_POINT = "/api/tickets/";

// ----- Create New Ticket
export const create = async (data, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(END_POINT, data, config);
  return response.data;
};

// ----------------- Get All tickets
export const getAll = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(END_POINT, config);
  return response.data;
};

// Get <One Ticket>
export const getOneTicket = async (ticketId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(END_POINT + ticketId, config);

  return response.data;
};

//  Close  status in the ticket

export const closeTicket = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const res = await axios.put(END_POINT + id, { status: "Closed" }, config);

  return res.data;
};

const ticketsServices = {
  create,
  getAll,
  getOneTicket,
  closeTicket,
};

export default ticketsServices;
