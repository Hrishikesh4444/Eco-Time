import React, { useState, useEffect } from "react";
import axios from "axios";
import "./solarForecast.css";

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
  const api_url = "https://eco-time.onrender.com/predict";

  async function fetchSolarPrediction(lat, lon, area, efficiency) {
    try {
      const { data } = await axios.post(
        api_url,
        {
          lat,
          lon,
          panel_area: area,
          panel_efficiency: efficiency,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return data;
    } catch (err) {
      // err.response contains the HTTP response (if any)
      const message =
        err.response?.data?.message || err.message || "Prediction API error";
      setError(message);
      throw new Error(message);
    }
  }

  let handleSubmit = () => {
    fetchSolarPrediction(12.97, 77.59, 1.6, 0.20)
      .then((data) => setPredictedPower(data.predicted_power))
      .catch(console.error);
  };
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
        {/* <input
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          className="time-input"
        /> */}
        <ul className="params-list">
          <li>
            <span className="label">Latitude</span>
            <span className="value">12.97</span>
          </li>
          <li>
            <span className="label">Longitude</span>
            <span className="value">77.59</span>
          </li>
          <li>
            <span className="label">Panel area</span>
            <span className="value">1.5 m²</span>
          </li>
          <li>
            <span className="label">Efficiency</span>
            <span className="value">18%</span>
          </li>
        </ul>

        <button onClick={handleSubmit} className="check-btn">
          Get Prediction
        </button>
        {predictedPower !== null && (
          <div className="result">
            Predicted Power: {(predictedPower * 1000).toFixed(4)} mW{" "}
          </div>
        )}
        {error && <div className="error">{error}</div>}
      </div>
    </div>
  );
};

export default SolarForecast;
