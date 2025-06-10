import React, { useContext } from "react";
import WeatherCard from "../weatherCard/weatherCard";
import { StoreContext } from "../../context/StoreContext";

const WeeklyForecast = () => {
  const { data } = useContext(StoreContext);

  if (!data || !data.list || data.list.length === 0) {
    return <div className="weekly-container">Please enter a valid city...</div>;
  }

  // Group forecasts by day
  const forecastMap = new Map();

  data.list.forEach((entry) => {
    const date = new Date(entry.dt * 1000);
    const dayKey = date.toISOString().split("T")[0]; // e.g., "2025-06-08"
    if (!forecastMap.has(dayKey)) {
      forecastMap.set(dayKey, []);
    }
    forecastMap.get(dayKey).push(entry);
  });

  // Pick 5 future days excluding today
  const groupedDays = Array.from(forecastMap.entries()).slice(1, 6); // skip today, show next 5

  const dailySummary = groupedDays.map(([dateStr, entries]) => {
    const temps = entries.map((e) => e.main.temp);
    const tempHigh = Math.max(...temps);
    const tempLow = Math.min(...temps);

    const condition = entries[Math.floor(entries.length / 2)]?.weather[0]?.description || "N/A";
    const iconCode = entries[Math.floor(entries.length / 2)]?.weather[0]?.main;

    const iconMap = {
      Clear: "☀️",
      Clouds: "☁️",
      Rain: "🌧️",
      Thunderstorm: "⛈️",
      Drizzle: "🌦️",
      Snow: "❄️",
      Mist: "🌫️",
      Smoke: "💨",
      Haze: "🌁",
      Dust: "🌪️",
      Fog: "🌫️",
      Sand: "🌪️",
      Ash: "🌋",
      Squall: "🌬️",
      Tornado: "🌪️",
    };

    const icon = iconMap[iconCode] || "❓";

    const dateObj = new Date(dateStr);
    const formattedDay = dateObj.toLocaleDateString(undefined, {
      weekday: "long",
      month: "long",
      day: "numeric",
    });

    return {
      day: formattedDay,
      tempHigh: Math.round(tempHigh),
      tempLow: Math.round(tempLow),
      condition,
      icon,
    };
  });

  return (
    <div className="weekly-container">
      {dailySummary.map((dayData, idx) => (
        <WeatherCard key={idx} {...dayData} />
      ))}
    </div>
  );
};

export default WeeklyForecast;
