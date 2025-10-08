import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
//----------REDUX STUFF---------------//
import { useDispatch, useSelector } from "react-redux";
import { registerProcess, reset } from "../features/authorization/authSlice";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const { name, email, password, password2 } = formData;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, isLoading, isSuccessRegister, isError, message } = useSelector(
    (state) => state.auth
  );

  // useEffect(() => {
  //   if (isError) {
  //     toast.error(message);
  //   }

  //   if (isSuccess || user) {
  //     toast.success(`Welcome ${user.name}`, {
  //       autoClose: 1000,
  //       hideProgressBar: true,
  //     });
  //     navigate("/");
  //   }
  //   dispatch(reset());
  // }, [isError, isLoading, isSuccess, message, navigate, user, dispatch]);
  //--------------FUNCTIONS-----------------------//

  useEffect(() => {
    if (isError) {
      toast.error(message);
      dispatch(reset());
    }

    if (isSuccessRegister && user) {
      toast.success(`Welcome ${user.name}`, {
        autoClose: 1000,
        hideProgressBar: true,
      });

      // استنى شوية صغيرين بعد النجاح
      setTimeout(() => {
        navigate("/");
        dispatch(reset());
      }, 300);
    }
  }, [
    isError,
    isSuccessRegister,
    user,
    isLoading,
    message,
    navigate,
    dispatch,
  ]);

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

    if (password !== password2) {
      toast.error("Passwors Must be The Same", {
        autoClose: 800,
        hideProgressBar: true,
      });
    } else {
      const registerUser = {
        name,
        email,
        password,
      };
      dispatch(registerProcess(registerUser));
    }
  };
  //------------------USE EFFECT-------------------//

  return (
    <>
      <section className="heading">
        <h1>
          <FaUser />
          Register
        </h1>
        <p>Create an account</p>
      </section>

      <section className="form">
        <form onSubmit={submitAction}>
          <div className="form-group">
            <input
              type="text"
              name="name"
              id="name"
              value={name}
              required
              placeholder="type your name"
              onChange={handleChanging}
            />
          </div>

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
            <input
              type="password"
              name="password2"
              id="password2"
              value={password2}
              required
              placeholder="confirm your password"
              onChange={handleChanging}
            />
          </div>

          <div className="form-group">
            <button className="btn btn-block">Submit</button>
          </div>
        </form>
      </section>
    </>
  );
};

export default Register;
