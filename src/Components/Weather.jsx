import React, { useEffect, useRef } from "react";
import "./Weather.css";
import { useState } from "react";
import search_icon from "../assets/search.png";
import clear_icon from "../assets/clear.png";
import cloud_icon from "../assets/cloud.png";
import drizzle_icon from "../assets/drizzle.png";
import humidity_icon from "../assets/humidity.png";
import rain_icon from "../assets/rain.png";
import snow_icon from "../assets/snow.png";
import wind_icon from "../assets/wind.png";
import snow_vedio from "../assets/snow_vedio.mp4";
import rain_video from "../assets/rain_video.mp4";
import drizzle_video from "../assets/drizzle_video.mp4";
import cloud_video from "../assets/cloud_video.mp4";
import clear_video from "../assets/clear_video.mp4";
import black from "../assets/black.jpg";

const allIcons = {
  "01d": clear_icon,
  "01n": clear_icon,
  "02d": cloud_icon,
  "02n": cloud_icon,
  "03d": cloud_icon,
  "03n": cloud_icon,
  "04d": drizzle_icon,
  "04n": drizzle_icon,
  "09d": rain_icon,
  "09n": rain_icon,
  "10d": rain_icon,
  "10n": rain_icon,
  "13d": snow_icon,
  "13n": snow_icon,
};

const allBGVideos = {
  "01d": clear_video,
  "01n": clear_video,
  "02d": cloud_video,
  "02n": cloud_video,
  "03d": cloud_video,
  "03n": cloud_video,
  "04d": drizzle_video,
  "04n": drizzle_video,
  "09d": rain_video,
  "09n": rain_video,
  "10d": rain_video,
  "10n": rain_video,
  "13d": snow_vedio,
  "13n": snow_vedio,
};

const Weather = () => {
  const [city, setCity] = useState();

  const [weatherData, setWeatherData] = useState({});

  const handleCityChange = (e) => {
    setCity(e.target.value);
  };

  const fetchWeather = async () => {
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${"df123949776f8d7bc061f03cc7435761"}`;
      const response = await fetch(url);
      const data = await response.json();
      console.log(data);
      const icon = allIcons[data.weather[0].icon] || clear_icon;
      const bg = allBGVideos[data.weather[0].icon] || clear_video;
      setWeatherData({
        temperature: Math.floor(data.main.temp),
        location: data.name,
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        icon: icon,
        bg: bg,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="app-container">
        <div className="overlay">
          {/* <img src={black} alt="" className="overlay" /> */}
        </div>

        <video
          key={weatherData.bg || clear_video}
          autoPlay
          loop
          muted
          className="background-video"
        >
          <source src={weatherData.bg || clear_video} type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        <div className="weather">
          <div className="search-bar">
            <input
              type="text"
              placeholder="Enter city name"
              value={city}
              onChange={handleCityChange}
            />

            <button onClick={fetchWeather}>
              <img src={search_icon} alt="" />
            </button>
          </div>

          {weatherData.icon && (
            <img src={weatherData.icon} alt="" className="weather-icon" />
          )}
          <p className="temperature">{weatherData.temperature} °C</p>
          <p className="location">{weatherData.location}</p>

          <div className="weather-data">
            <div className="col">
              <img src={humidity_icon} alt="" />
              <div>
                <p>{weatherData.humidity} %</p>
                <span>Humidity</span>
              </div>
            </div>

            <div className="col">
              <img src={wind_icon} alt="" />
              <div>
                <p>{weatherData.windSpeed} KM/H</p>
                <span>Wind Speed</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Weather;
