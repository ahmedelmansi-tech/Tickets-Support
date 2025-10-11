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

const ticketsServices = {
  create,
  getAll,
  getOneTicket,
};

export default ticketsServices;
