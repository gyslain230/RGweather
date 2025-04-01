import { useEffect } from "react";

function LocationDetector({ onLocationDetected, onError }) {
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          onLocationDetected(latitude, longitude);
        },
        (error) => {
          onError(error.message || "Error getting location");
        }
      );
    } else {
      onError("Geolocation is not supported by your browser");
    }
  }, [onLocationDetected, onError]);

  return null; // This component doesn't render anything
}

export default LocationDetector;
