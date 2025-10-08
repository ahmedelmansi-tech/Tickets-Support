import { FaSignInAlt, FaSignOutAlt, FaUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
// import { useEffect } from "react";
import { reset, loggingOut } from "../features/authorization/authSlice";
const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  // console.log("HEADER USER:", user);

  const onLogOut = async () => {
    await dispatch(loggingOut()).unwrap();
    navigate("/login");
    dispatch(reset());
  };

  // useEffect(() => {
  //   const currentPath = window.location.pathname;
  //   if (!user && currentPath !== "/login" && currentPath !== "/register") {
  //   }
  // }, [user, navigate]);

  return (
    <header className="header">
      <div className="logo">
        <Link to={"/"}> Support Desk</Link>
      </div>

      <ul>
        {user ? (
          <li>
            <button className="btn" onClick={onLogOut}>
              <FaSignOutAlt /> Logout
            </button>
          </li>
        ) : (
          <>
            <li>
              <Link to={"/login"}>
                <FaSignInAlt /> Login
              </Link>
            </li>

            <li>
              <Link to={"/register"}>
                <FaUser /> Register
              </Link>
            </li>
          </>
        )}
      </ul>
    </header>
  );
};

export default Header;
