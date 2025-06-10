import React, { useContext } from "react";
import { StoreContext } from "../../context/StoreContext";

const TodayHighlights = () => {
  const { data } = useContext(StoreContext);

  if (!data || !data.list || data.list.length === 0 || !data.city) {
    return <div className="highlight-container">Please enter a valid city...</div>;
  }

  const formatTime = (timestamp) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const highlights = [
    {
      label: "Humidity",
      value: `${data.list[0].main.humidity}%`,
      icon: "💧",
    },
    {
      label: "Wind Speed",
      value: `${data.list[0].wind.speed} m/s`,
      icon: "🌬️",
    },
    {
      label: "Sunrise",
      value: formatTime(data.city.sunrise),
      icon: "🌅",
    },
    {
      label: "Sunset",
      value: formatTime(data.city.sunset),
      icon: "🌇",
    },
    {
      label: "Clouds",
      value: `${data.list[0].clouds.all}%`,
      icon: "☁️",
    },
    {
      label: "Pressure",
      value: `${data.list[0].main.pressure} hPa`,
      icon: "⚖️",
    },
  ];

  return (
    <div className="highlight-container">
      {highlights.map((item, index) => (
        <div className="highlight-card" key={index}>
          <div className="highlight-icon">{item.icon}</div>
          <div className="highlight-label">{item.label}</div>
          <div className="highlight-value">{item.value}</div>
        </div>
      ))}
    </div>
  );
};

export default TodayHighlights;
