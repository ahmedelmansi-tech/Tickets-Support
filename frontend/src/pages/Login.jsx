import { useState } from "react";
import { toast } from "react-toastify";
import { FaSignInAlt } from "react-icons/fa";

//------------REDUX STUFF-------------------//
import { useDispatch, useSelector } from "react-redux";
import { loggingIn } from "../features/authorization/authSlice";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const dispatch = useDispatch();
  const { user, isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.auth
  );
  //--------------FUNCTIONS-----------------------//

  // (1)
  const handleChanging = (e) => {
    const typed = e.target;

    setFormData((prevState) => {
      return {
        ...prevState,
        [typed.id]: typed.value,
      };
    });
  };

  // (2)

  const submitAction = (e) => {
    e.preventDefault();

    const visitor = {
      email,
      password,
    };

    dispatch(loggingIn(visitor));

    toast.success("Welcome", {
      autoClose: 1000,
      hideProgressBar: true,
    });
  };

  return (
    <>
      <section className="heading">
        <h1>
          <FaSignInAlt />
          Login
        </h1>
        <p>log in to get support</p>
      </section>

      <section className="form">
        <form onSubmit={submitAction}>
          <div className="form-group">
            <input
              type="email"
              name="email"
              id="email"
              value={email}
              required
              placeholder="enter your email"
              onChange={handleChanging}
            />
          </div>

          <div className="form-group">
            <input
              type="password"
              name="password"
              id="password"
              value={password}
              required
              placeholder="make your password"
              onChange={handleChanging}
            />
          </div>

          <div className="form-group">
            <button className="btn btn-block">Log-In</button>
          </div>
        </form>
      </section>
    </>
  );
};

export default Login;
