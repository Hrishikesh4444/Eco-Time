import React, { useContext, useEffect, useState } from "react";
import "./authentication.css";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
const Authentication = ({ setShowLogin }) => {
  const { url, token, setToken,handleError,handleSuccess } = useContext(StoreContext);
  const [currState, setCurrState] = useState("Sign up");
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setData((data) => ({ ...data, [name]: value }));
  };
  const onLogin = async (e) => {
    e.preventDefault();
    let newUrl = url;
    if (currState === "Log in") {
      newUrl += "/login";
    } else {
      newUrl += "/register";
    }

    try {
      const response = await axios.post(newUrl, data);
      if (response.data.success) {
        setToken(response.data.token);
        localStorage.setItem("token", response.data.token);
        handleSuccess("Logged in");
        setShowLogin(false);
      } else {
        handleError(response.data.message);
      }
    } catch (error) {
      handleError(error.response?.data?.message || "Something went wrong");
      console.error("Login/Register Error:", error);
    }
  };
  
  // useEffect(()=>{
  //   console.log(data);
  // },[data]);
  return (
    <div className="login-popup">
      <ToastContainer />
      <form onSubmit={onLogin} className="login-popup-container">
        <div className="login-popup-title">
          <h2>{currState}</h2>
          <img
            onClick={() => setShowLogin(false)}
            src="./cross_icon.png"
            alt=""
          />
        </div>
        <div className="login-popup-inputs">
          {currState === "Log in" ? (
            <></>
          ) : (
            <input
              type="text"
              name="name"
              onChange={onChangeHandler}
              value={data.name}
              placeholder="enter your name"
              required
            />
          )}

          <input
            type="email"
            name="email"
            onChange={onChangeHandler}
            value={data.email}
            placeholder="enter your email"
            required
          />
          <input
            type="password"
            name="password"
            onChange={onChangeHandler}
            value={data.password}
            placeholder="enter your password"
            required
          />
        </div>
        <button type="submit">
          {currState === "Sign up" ? "Create account" : "Log in"}
        </button>
        <div className="login-popup-condition">
          <input style={{ cursor: "pointer" }} type="checkbox" required />
          <p>By continuing, I agree to the terms of use & privacy policy.</p>
        </div>
        {currState === "Log in" ? (
          <p>
            Create a new account ?{" "}
            <span onClick={() => setCurrState("Sign up")}> Click here</span>
          </p>
        ) : (
          <p>
            Already have an account ?
            <span onClick={() => setCurrState("Log in")}> Login here</span>
          </p>
        )}
      </form>
    </div>
  );
};

export default Authentication;
