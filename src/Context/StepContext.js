import React, { createContext, useState, useEffect } from "react";

// Create the context
export const StepsContext = createContext();

// Create a provider component
export const StepsProvider = ({ children }) => {
  const [stepLogs, setStepLogs] = useState(() => {
    const storedLogs = localStorage.getItem("stepLogs");
    return storedLogs ? JSON.parse(storedLogs) : [];
  });

  // Effect to save step logs to local storage whenever they change
  useEffect(() => {
    localStorage.setItem("stepLogs", JSON.stringify(stepLogs));
  }, [stepLogs]);

  // Function to log steps and calculate calories
  const logSteps = (newSteps) => {
    const stepCount = Number(newSteps);
    if (stepCount > 0) {
      const stepCalories = stepCount * 0.04;
      const newLog = { steps: stepCount, calories: stepCalories };
      setStepLogs((prevLogs) => [...prevLogs, newLog]);
    }
  };

  // Function to delete a specific log entry
  const deleteSteps = (index) => {
    setStepLogs((prevLogs) => prevLogs.filter((_, i) => i !== index));
  };

  return (
    <StepsContext.Provider
      value={{
        stepLogs,
        logSteps,
        deleteSteps, // Add delete function to context
      }}
    >
      {children}
    </StepsContext.Provider>
  );
};
