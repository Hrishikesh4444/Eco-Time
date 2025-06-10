import React from "react";

const WeatherCard = ({ day, tempHigh, tempLow, condition, icon }) => {
  return (
    <div className="weather-card">
      <h4>{day}</h4>
      <div className="weather-icon">{icon}</div>
      <p>{condition}</p>
      <p>{tempHigh}°C / {tempLow}°C</p>
    </div>
  );
};

export default WeatherCard;
