import React, { useState } from "react";
import axios from "axios";
import "./SolarForecast.css";

const SolarForecast = () => {
  const [time, setTime] = useState("");
  const [predictedPower, setPredictedPower] = useState(null);
  const [error, setError] = useState("");
  const convertTo24Hour = (timeStr) => {
    const [time, modifier] = timeStr.trim().toUpperCase().split(" ");
    let [hours, minutes] = time.split(":");

    hours = parseInt(hours);
    if (modifier === "PM" && hours !== 12) {
      hours += 12;
    }
    if (modifier === "AM" && hours === 12) {
      hours = 0;
    }

    return hours;
  };

  let handleSubmit=()=>{
    setPredictedPower(123)
  }
  return (
    <div id="predictor" style={{ paddingTop: "6rem", paddingBottom: "2rem" }}>
      <div>
        <p className="weather-heading">
          Solar Power <span className="weather-highlight">Predictor</span>
        </p>
      </div>
      <br />
      <div className="prediction-container">
        {/* <h2>Check Solar Power Forecast</h2> */}
        <input
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          className="time-input"
        />
        <button 
        onClick={handleSubmit} 
        className="check-btn">
          Get Prediction
        </button>
        {predictedPower !== null && (
          <div className="result">Predicted Power: {predictedPower} W <span style={{color: "rgb(226, 117, 110)"}}><br /> <br />Model integration not completed yet <br />Currently showing random power</span></div>
        )}
        {error && <div className="error">{error}</div>}
      </div>
    </div>
  );
};

export default SolarForecast;
