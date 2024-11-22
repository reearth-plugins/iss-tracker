import { useState, useEffect } from "react";

import { postMsg } from "@/shared/utils";

type IssPosition = {
  lat: number;
  lon: number;
  height: number;
};

export default () => {
  const [issPosition, setIssPosition] = useState<IssPosition | null>(null);
  const [isFollowing, setIsFollowing] = useState(false);

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

  // Fly to the current position
  const handleFlyTo = () => {
    if (issPosition) {
      postMsg("flyTo", issPosition);
    } else {
      console.warn("No position available to fly to.");
    }
  };

  // Automatically follow the ISS position
  useEffect(() => {
    let intervalId: NodeJS.Timeout | null = null;

    if (isFollowing) {
      intervalId = setInterval(async () => {
        await fetchIssLocation();
        handleFlyTo();
      }, 5000); // Update every 5 seconds
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [isFollowing, issPosition]);

  // Toggle follow/unfollow
  const toggleFollow = () => {
    setIsFollowing((prev) => !prev);
  };

  return { issPosition, fetchIssLocation, handleFlyTo, isFollowing, toggleFollow };
};
