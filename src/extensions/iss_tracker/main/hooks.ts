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
  const handleUpdate = async () => {
    const position = await fetchIssLocation();
    setIssPosition(position);
  };

  // Fly to the current position
  const handleJump = () => {
    flyTo(issPosition);
  };

  // Automatically follow the ISS position
  useEffect(() => {
    let intervalId: NodeJS.Timeout | null = null;

    const follow = async () => {
      const position = await fetchIssLocation();
      setIssPosition(position);
      flyTo(position);
    };

    if (isFollowing) {
      follow(); // Update once immediately
      intervalId = setInterval(follow, 5000); // Update every 5 seconds
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [isFollowing]);

  // Toggle follow/unfollow
  const toggleFollow = () => {
    setIsFollowing((prev) => !prev);
  };

  return {
    issPosition,
    handleUpdate,
    handleJump,
    isFollowing,
    toggleFollow,
  };
};

// Function to fetch the ISS position from the API
const fetchIssLocation = async (): Promise<IssPosition | null> => {
  try {
    const response = await fetch(
      "https://api.wheretheiss.at/v1/satellites/25544"
    );
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return {
      lat: data.latitude,
      lon: data.longitude,
      height: data.altitude * 1000, // Convert altitude from km to meters
    };
  } catch {
    // Return null if an error occurs
    return null;
  }
};

// Function to update the camera position
const flyTo = (position: IssPosition | null): void => {
  if (!position) {
    console.warn("No position available to fly to.");
    return;
  }
  postMsg("flyTo", position);
};
