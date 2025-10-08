import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { FaSignInAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
//------------REDUX STUFF-------------------//
import { useDispatch, useSelector } from "react-redux";
import { loggingIn } from "../features/authorization/authSlice";

//--------Components
import Spinner from "../components/Spinner";
const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isLoading, isSuccessLogin, isError, message } = useSelector(
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

  useEffect(() => {
    if (isSuccessLogin || user) {
      navigate("/");
      toast.success("Welcome", {
        autoClose: 1000,
        hideProgressBar: true,
      });
    }

    if (isError) {
      toast.error(message, {
        autoClose: 500,
        hideProgressBar: true,
      });
    }
  }, [isSuccessLogin, user, isLoading, isError, message, navigate]);

  // (2)
  const submitAction = (e) => {
    e.preventDefault();

    const visitor = {
      email,
      password,
    };
    dispatch(loggingIn(visitor));
  };

  return isLoading ? (
    <Spinner />
  ) : (
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
