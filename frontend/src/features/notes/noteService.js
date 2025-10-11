import axios from "axios";
const END_POINT = "api/tickets/";

// Get <One omment>
export const getOnecomment = async (ticketId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(END_POINT + ticketId + "/notes", config);

  return response.data;
};

const noteService = {
  getOnecomment,
};

export default noteService;
