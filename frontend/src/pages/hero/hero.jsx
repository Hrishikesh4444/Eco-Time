import React,{useEffect} from "react";
import { Link, Route, useNavigate } from "react-router-dom";
import ScrollReveal from "../../components/ScrollReveal/ScrollReveal";
import "./hero.css";
import Weather from "../weather/weather";
import AboutUs from "../aboutUs/aboutUs";
import SolarForecast from "../solarForecast/solarForecast";
const Hero = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="home" id="home">
      <div className="hero-container">
        <div className="hero-left">
          <h1>
            Explore Clean Energy <br />
            <span className="hero-highlight">Solutions</span>
          </h1>
          <br />
          <p className="hero-description">
            Welcome to Eco-Time, your dedicated platform for renewable energy
            solutions. Discover our innovative services and sustainable
            practices to reduce your carbon footprint and contribute to a
            greener future.
          </p>
        </div>
        <div className="hero-right">
          <img src="./heroImg.jpeg" alt="Energy Metrics Tablet" />
        </div>
      </div>
      <SolarForecast/>
      <Weather />
      <AboutUs />
    </div>
  );
};

export default Hero;
