import React, { createContext, useState, useEffect } from "react";

export const ActivityContext = createContext();

export const ActivityProvider = ({ children }) => {
  const [activities, setActivities] = useState(() => {
    // Load activities from local storage on initial render
    const storedActivities = localStorage.getItem("activities");
    return storedActivities ? JSON.parse(storedActivities) : [];
  });

  // Effect to save activities to local storage whenever they change
  useEffect(() => {
    localStorage.setItem("activities", JSON.stringify(activities));
  }, [activities]);

  const Log = (activity) => {
    setActivities((prevActivities) => [...prevActivities, activity]);
  };
  useEffect(() => {
    localStorage.setItem("activities", JSON.stringify(activities)); // Sync with local storage
  }, [activities]);

  return (
    <ActivityContext.Provider value={{ activities, Log, setActivities }}>
      {children}
    </ActivityContext.Provider>
  );
};
