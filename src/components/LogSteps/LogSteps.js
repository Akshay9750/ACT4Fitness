import React, { useContext, useState } from "react";
import { StepsContext } from "../../Context/StepContext";
import { Link } from "react-router-dom";
import "./LogSteps.css";

const LogSteps = () => {
  const [inputSteps, setInputSteps] = useState("");
  const { logSteps, stepLogs, deleteSteps } = useContext(StepsContext);

  const handleClick = () => {
    if (!isNaN(inputSteps) && inputSteps !== "") {
      const currentDate = new Date().toISOString().split("T")[0];
      logSteps(inputSteps, currentDate);
      setInputSteps("");
    } else {
      alert("Please enter a valid number");
    }
  };

  // Get the last 3 days (including today)
  const getRecentDates = () => {
    const dates = [];
    for (let i = 0; i < 3; i++) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      dates.push(date.toISOString().split("T")[0]);
    }
    return dates;
  };

  const recentDates = getRecentDates();
  const today = new Date().toISOString().split("T")[0];

  const handleDelete = (date, index) => {
    if (date === today) {
      deleteSteps(date, index);
    } else {
      alert("You can only delete steps for the current date.");
    }
  };

  return (
    <div className="log-steps-container">
      <h1 className="log-steps-title">Log Your Steps</h1>
      <div className="log-steps-form">
        <input
          type="text"
          placeholder="Enter your steps"
          value={inputSteps}
          onChange={(e) => setInputSteps(e.target.value)}
          className="log-steps-input"
          required
        />
        <button
          type="button"
          onClick={handleClick}
          className="log-steps-button"
        >
          Log Steps
        </button>
      </div>

      <div className="step-history">
        <h2 className="step-history-title">Recent Step History</h2>
        <div className="step-history-list">
          {recentDates.map((date) => (
            <div key={date} className="step-history-item">
              <div className="step-history-date">{formatDate(date)}</div>
              <div className="step-history-logs">
                {stepLogs[date] &&
                Array.isArray(stepLogs[date]) &&
                stepLogs[date].length > 0 ? (
                  stepLogs[date].map((log, index) => (
                    <div key={index} className="step-log">
                      <span className="step-count">{log.steps} steps</span>
                      <span className="calorie-count">
                        {log.calories.toFixed(2)} kcal
                      </span>
                      <button
                        onClick={() => handleDelete(date, index)}
                        className={`delete-log ${
                          date !== today ? "disabled" : ""
                        }`}
                        disabled={date !== today}
                      >
                        ×
                      </button>
                    </div>
                  ))
                ) : (
                  <div className="step-log">No steps logged</div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <Link to="/" className="home-link">
        Back to Homepage
      </Link>
    </div>
  );
};

// Helper function to format date
const formatDate = (dateString) => {
  const options = { weekday: "long", month: "long", day: "numeric" };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

export default LogSteps;
