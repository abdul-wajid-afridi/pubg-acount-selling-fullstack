import React, { useState } from "react";
import { Link } from "react-router-dom";
import decode from "jwt-decode";
import "./Styles/Navbar.css";
import { FaHackerNews, FaHamburger, FaTimes } from "react-icons/fa";
// import { logOutUser, selectUser } from "../Redux/reduxSlices/UserSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { setUser, setUserLogOut } from "../Redux/Features/UserSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const [Menu, setMenu] = useState(false);
  const { user } = useSelector((state) => ({ ...state.UserSlice }));
  // const token = user?.token;
  // if (token) {
  //   const decodeToken = decode(token);
  //   if (decodeToken.exp * 1000 < new Date().getTime()) {
  //     dispatch(logOutUser());
  //   }
  // }

  // const handleLogOut = () => {
  //   dispatch(logOutUser());
  // };
  // console.log(user?.result?.name);
  const getToken = JSON.parse(localStorage.getItem("token"));

  useEffect(() => {
    dispatch(setUser(getToken));
  }, [dispatch]);

  const handleLogout = () => {
    dispatch(setUserLogOut());
  };
  return (
    <section className="navbar__container">
      <nav
        onClick={() => setMenu(!Menu)}
        className={Menu ? "navbar__menu navbar__active" : "navbar__menu"}
      >
        <Link className="navbar__items" to={"/"}>
          <FaHackerNews className="navbar__logo" />
        </Link>
        <Link className="navbar__items" to={"/"}>
          Home
        </Link>

        <>
          {user?.userName && (
            <>
              <Link className="navbar__items" to={"/postid-details"}>
                Add Post
              </Link>
              <Link className="navbar__items" to={"/favorite"}>
                Favorite
              </Link>
              <Link className="navbar__items" to={"/dashboard"}>
                Dashboard
              </Link>
            </>
          )}
        </>
        {user?.userName ? (
          <Link className="navbar__items" onClick={handleLogout} to={"/login"}>
            log out
          </Link>
        ) : (
          <>
            <Link className="navbar__items" to={"/login"}>
              Login
            </Link>
            <Link className="navbar__items" to={"/register"}>
              Register
            </Link>
          </>
        )}
      </nav>
      <div className="navbar__icons" onClick={() => setMenu(!Menu)}>
        {Menu ? <FaHamburger /> : <FaTimes />}
      </div>
    </section>
  );
};

export default Navbar;
