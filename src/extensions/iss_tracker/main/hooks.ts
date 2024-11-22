import { useState } from "react";

type IssPosition = {
  lat: number;
  lon: number;
  height: number;
};

export default () => {
  const [issPosition, setIssPosition] = useState<IssPosition | null>(null);

  // Function to fetch the ISS position from the API
  const fetchIssLocation = async () => {
    try {
      const response = await fetch("https://api.wheretheiss.at/v1/satellites/25544");
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setIssPosition({
        lat: data.latitude,
        lon: data.longitude,
        height: data.altitude * 1000, // Convert altitude from km to meters
      });
    } catch {
      // Reset the position to null if an error occurs
      setIssPosition(null);
    }
  };

  return { issPosition, fetchIssLocation };
};
