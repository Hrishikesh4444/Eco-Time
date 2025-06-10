import React from "react";
import "./aboutUs.css";

const AboutUs = () => {
  return (
    <div className="aboutus-container" id="about-us">
      <div>
        <p className="aboutus-heading">
          About <span className="aboutus-highlight">Us</span>
        </p>
      </div>

      <div className="aboutus-content">
        <img className="aboutus-image" src="./sideImg.jpg" alt="" />
        <div className="aboutus-text">
          <p>
            At Eco-Time, we believe in harnessing the power of nature
            intelligently to create a sustainable future. Our platform leverages
            real-time weather data and advanced machine learning models to
            optimize solar energy generation and appliance usage. By analyzing
            sunlight patterns, weather forecasts, and energy consumption trends,
            Eco-Time provides personalized schedules for charging your
            appliances when solar energy is at its peak efficiency.
          </p>
          <p>
            Whether you're a homeowner, a business, or a renewable energy
            enthusiast, Eco-Time helps you reduce electricity costs, minimize
            carbon footprints, and maximize clean energy usage—all with smart,
            data-driven insights. Join us in making energy consumption smarter,
            greener, and more efficient.
          </p>
          
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
