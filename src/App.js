import React, { useState } from "react";
import WeatherCard from "./components/WeatherCard";
import "./App.css";

function App() {
  const [city, setCity] = useState("");
  const [loading, setLoading] = useState(false);
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState("");

  const fetchWeatherData = async () => {
    if (!city) {
      alert("Please enter a city name");
      return;
    }

    setLoading(true);
    setError("");
    setWeatherData(null);

    try {
      const response = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=Your_API_KEY&q=${city}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch weather data");
      }
      const data = await response.json();

      setTimeout(() => {
        setWeatherData(data);
        setLoading(false);
      }, 500);
    } catch (error) {
      setLoading(false);
      setError("Failed to fetch weather data");
      alert("Failed to fetch weather data");
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      fetchWeatherData();
    }
  };

  return (
    <div className="App">
      <h1>Weather App</h1>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <button onClick={fetchWeatherData}>Search</button>{" "}
      </div>
      {loading && <p>Loading data...</p>} {error && <p>{error}</p>}
      {weatherData && <WeatherCard data={weatherData} />}
    </div>
  );
}

export default App;
