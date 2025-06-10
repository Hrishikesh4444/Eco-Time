import React, { useContext } from "react";
import "../App.css";
import { Link, Route, useNavigate } from "react-router-dom";
import { StoreContext } from "../context/StoreContext";
import { ToastContainer } from "react-toastify";
const Navbar = ({ setShowLogin }) => {
  const { getTotalCartAmount, token, setToken, handleSuccess, handleError } =
    useContext(StoreContext);
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    handleSuccess("User logged out");
    navigate("/");
  };
  return (
    <div className="landingPageContainer">
      <nav>
        <div className="navHeader">
          <h1
            style={{ cursor: "pointer" }}
            onClick={() => {
              navigate("/");
            }}
          >
            Eco Time
          </h1>
        </div>
        <div className="nav-items">
          <a href="#home">Home</a>
          <a href="#predictor">Predictor</a>
          <a href="#weather">Weather</a>
          <a href="#about-us">About Us</a>
        </div>
        <div className="navList">
          {/* <p
            onClick={() => {
              navigate("/auth");
            }}
          >
            Register
          </p> */}
          {!token ? (
            <div role="button" onClick={() => setShowLogin(true)}>
              Log in
            </div>
          ) : (
            <div role="button" onClick={logout}>
              Log out
            </div>
          )}
        </div>
      </nav>
      <ToastContainer />
    </div>
  );
};

export default Navbar;