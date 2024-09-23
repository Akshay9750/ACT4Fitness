import React, { createContext, useState, useEffect } from "react";

export const StepsContext = createContext();

export const StepsProvider = ({ children }) => {
  const [stepLogs, setStepLogs] = useState(() => {
    const storedLogs = localStorage.getItem("stepLogs");
    return storedLogs ? JSON.parse(storedLogs) : {};
  });

  useEffect(() => {
    localStorage.setItem("stepLogs", JSON.stringify(stepLogs));
  }, [stepLogs]);

  const logSteps = (newSteps, date) => {
    const stepCount = Number(newSteps);
    if (stepCount > 0) {
      const stepCalories = stepCount * 0.04;
      setStepLogs((prevLogs) => ({
        ...prevLogs,
        [date]: [
          ...(prevLogs[date] || []),
          { steps: stepCount, calories: stepCalories },
        ],
      }));
    }
  };

  const deleteSteps = (date, index) => {
    setStepLogs((prevLogs) => ({
      ...prevLogs,
      [date]: prevLogs[date].filter((_, i) => i !== index),
    }));
  };

  return (
    <StepsContext.Provider value={{ stepLogs, logSteps, deleteSteps }}>
      {children}
    </StepsContext.Provider>
  );
};
