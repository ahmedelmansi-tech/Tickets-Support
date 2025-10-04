import axios from "axios";
const ENDPOINT = "http://localhost:2525/api/users";
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

  console.log(await response.data);

  return response.data;
};

// const register = async (dataSentWithTheReq) => {
//   const response = await fetch(API_URL, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(dataSentWithTheReq),
//   });

//   if (!response.ok) {
//     // لو السيرفر رجع Error Status زي 400 أو 500
//     const errorData = await response.json();
//     throw new Error(errorData.message || "Something went wrong");
//   }

//   const data = await response.json();

//   if (data) {
//     localStorage.setItem("user", JSON.stringify(data));
//   }

//   return data;
// };

const authService = {
  register,
};

export default authService;
