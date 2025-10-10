import axios from "axios";
const END_POINT = "/api/tickets/";

export const create = async (data, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(END_POINT, data, config);
  return response.data;
};

export const getAll = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(END_POINT, config);
  return response.data;
};

const ticketsServices = {
  create,
  getAll,
};

export default ticketsServices;
