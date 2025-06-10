import React, { useContext, useState, useEffect, useRef } from "react";
import TodayHighlights from "../../components/todayHighlight/todayHighlight";
import WeeklyForecast from "../../components/weeklyForecast/weeklyForecast";
import { StoreContext } from "../../context/StoreContext";
import TextField from "@mui/material/TextField";
import { alpha, styled } from "@mui/material/styles";

const Weather = () => {
  const [city, setCity] = useState("");
  const [error, setError] = useState("");

  const { checkWeather, data } = useContext(StoreContext);
  const inputRef = useRef();
  useEffect(() => {
  checkWeather("Dhubri");
}, []);


  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [city]);
  const handleSearch =async () => {
    if (city.trim() !== "") {
    const result = await checkWeather(city.trim());

    if (result?.cod === "404") {
      
      setError("City not found. Please enter a valid city.");
    } else {
      setError("");
    }
  }
  };

  const CssTextField = styled(TextField)({
    "& label.Mui-focused": {
      color: "rgb(253, 253, 215)",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "#B2BAC2",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "rgb(253, 253, 215)",
      },
      "&:hover fieldset": {
        borderColor: "rgb(253, 253, 215)",
      },
      "&.Mui-focused fieldset": {
        borderColor: "rgb(253, 253, 215)",
      },
    },
  });

  return (
    <div style={{ paddingTop: "4rem" }} className="weather" id="weather">
      <div>
        <p className="weather-heading">
          Weather <span className="weather-highlight">Details</span>
        </p>
      </div>
      <br />
      <div className="weather-container">
        <div className="sidebar">
          <div className="input-div">
            {/* <input
              className="city-input"
              placeholder="Enter City"
              type="text"
              name="city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            /> */}

            <CssTextField
              inputRef={inputRef}
              label="Enter City"
              variant="outlined"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              InputProps={{
                style: {
                  color: "rgb(253, 253, 215)",
                },
              }}
              InputLabelProps={{
                style: {
                  color: "rgb(253, 253, 215)",
                },
              }}
            />

            <button className="search-btn" onClick={handleSearch}>
              Search
            </button>
           
            
            
          </div>
          <br />
          {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}

          {data && data.list && (
            <div className="current-weather">
              <img
                className="weather-img"
                alt=""
                src={
                  data.list[0].weather[0].main === "Clouds"
                    ? "/clouds.png"
                    : data.list[0].weather[0].main === "Clear"
                    ? "/clear.png"
                    : data.list[0].weather[0].main === "Rain"
                    ? "/rain.png"
                    : data.list[0].weather[0].main === "Drizzle"
                    ? "/drizzle.png"
                    : data.list[0].weather[0].main === "Mist"
                    ? "/mist.png"
                    : "/default.png"
                }
              />
              <h3>{data.city.name}</h3>
              <p>Temp: {Math.round(data.list[0].main.temp)}°C</p>
              <p>Feels like {Math.round(data.list[0].main.feels_like)}°C</p>
              <p>{data.list[0].weather[0].description}</p>
            </div>
          )}
        </div>
        <div className="main">
          <h2>Today's Highlights</h2>
          <br />
          <TodayHighlights />
          <h2>This Week</h2>
          <br />
          <WeeklyForecast />
        </div>
      </div>
    </div>
  );
};

export default Weather;
