import React, { createContext, useState, useEffect } from "react";

export const ActivityContext = createContext();

export const ActivityProvider = ({ children }) => {
  const [activities, setActivities] = useState(() => {
    const storedActivities = localStorage.getItem("activities");
    return storedActivities ? JSON.parse(storedActivities) : {};
  });

  useEffect(() => {
    localStorage.setItem("activities", JSON.stringify(activities));
  }, [activities]);

  const logActivity = (activity, date) => {
    setActivities((prevActivities) => ({
      ...prevActivities,
      [date]: [...(prevActivities[date] || []), activity],
    }));
  };

  return (
    <ActivityContext.Provider
      value={{ activities, logActivity, setActivities }}
    >
      {children}
    </ActivityContext.Provider>
  );
};
