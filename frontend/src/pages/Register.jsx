import { useState } from "react";
import { toast } from "react-toastify";
import { FaUser } from "react-icons/fa";
const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const { name, email, password, password2 } = formData;

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

    if (password !== password2) {
      toast.error("Passwors Must be The Same", {
        autoClose: 800,
        hideProgressBar: true,
      });
    }

    // toast.success("Welcome", {
    //   autoClose: 1000,
    //   hideProgressBar: true,
    // });
  };

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
