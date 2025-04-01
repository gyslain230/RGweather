import React, { useState, useEffect } from "react";

function LocationToCity() {
  const [city, setCity] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const API_KEY = "f6e44c06f297e53dedc2ef34ca50548e";

  useEffect(() => {
    const fetchCity = async (latitude, longitude) => {
      try {
        const response = await fetch(
          `https://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=${API_KEY}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch city");
        }

        const data = await response.json();

        if (data && data.length > 0) {
          setCity(data[0].name);
        } else {
          setError("City not found");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    const getLocation = () => {
      if (!navigator.geolocation) {
        setError("Geolocation is not supported by your browser.");
        setLoading(false);
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetchCity(latitude, longitude);
        },
        (err) => {
          setError(`Unable to retrieve your location: ${err.message}`);
          setLoading(false);
        }
      );
    };

    getLocation();
  }, []);

  if (loading) {
    return <div>getting your location...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return <div>{city ? <p>City: {city}</p> : <p>City not found.</p>}</div>;
}

export default LocationToCity;
