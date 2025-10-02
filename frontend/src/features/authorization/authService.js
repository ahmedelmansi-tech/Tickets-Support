import axios from "axios";
const API_URL = "/api/users/";

// register user
const register = async (dataSentWithTheReq) => {
  const response = await axios.post(API_URL, dataSentWithTheReq);
  // if (response.data) {
  //   localStorage.setItem("user", JSON.stringify(response.data));
  // }

  return response.data;
};

const authService = {
  register,
};

export default authService;
