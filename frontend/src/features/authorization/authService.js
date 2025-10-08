import axios from "axios";
const ENDPOINT = "/api/users";
// register user
const register = async (dataSentWithTheReq) => {
  const response = await axios.post(ENDPOINT, dataSentWithTheReq, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

//LOGOUT
const logOut = () => localStorage.removeItem("user");

// LOG IN

const logIn = async (loginUser) => {
  const res = await axios.post(`${ENDPOINT}/login`, loginUser, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return await res.data;
};

const authService = {
  register,
  logOut,
  logIn,
};

export default authService;
