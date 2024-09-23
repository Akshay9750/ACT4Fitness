import "./App.css";
import LogActivity from "./components/LogActivity/LogActivity";
import React from "react";
import { Routes, Route } from "react-router-dom";
import Homepage from "./components/Homepage/HomaPage";
import LogActivityPage from "./components/LogActivity/LogActivity";
import LogSteps from "./components/LogSteps/LogSteps";
import UserStats from "./components/UserStats/UserStats";
import { ActivityProvider } from "./Context/ActivityContext";
import { UserProvider } from "./Context/UserContext";
import { StepsProvider } from "./Context/StepContext";
import "react-datepicker/dist/react-datepicker.css";

function App() {
  return (
    <ActivityProvider>
      <UserProvider>
        <StepsProvider>
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/log-activity" element={<LogActivityPage />} />
            <Route path="/log-steps" element={<LogSteps />} />
            <Route path="/user-stats" element={<UserStats />} />
          </Routes>
        </StepsProvider>
      </UserProvider>
    </ActivityProvider>
  );
}

export default App;
