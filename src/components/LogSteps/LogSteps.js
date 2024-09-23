import React, { useContext, useState } from "react";
import { StepsContext } from "../../Context/StepContext";
import { Link } from "react-router-dom";
import "./LogSteps.css";

const LogSteps = () => {
  const [inputSteps, setInputSteps] = useState("");
  const { logSteps, stepLogs, deleteSteps } = useContext(StepsContext);

  const handleClick = () => {
    if (!isNaN(inputSteps) && inputSteps !== "") {
      logSteps(inputSteps); // Save steps to context and calculate calories
      setInputSteps(""); // Clear the input after submission
    } else {
      alert("Please enter a valid number");
    }
  };

  return (
    <div className="log-steps-container">
      <h1>Log Steps</h1>
      <label>Steps walked</label>
      <input
        type="text"
        placeholder="Enter your steps"
        value={inputSteps}
        onChange={(e) => setInputSteps(e.target.value)}
        required
      />
      <button type="button" onClick={handleClick}>
        Submit
      </button>

      {/* Display the logged steps */}
      <div className="log-steps-stats">
        <h2>Logged Steps:</h2>
        {stepLogs.length > 0 ? (
          <ul>
            {stepLogs.map((log, index) => (
              <li key={index}>
                {log.steps} steps - {log.calories.toFixed(2)} kcal
                <button onClick={() => deleteSteps(index)}>Delete</button>
              </li>
            ))}
          </ul>
        ) : (
          <p>No steps logged yet.</p>
        )}
      </div>

      <Link to="/">GO to HomePage</Link>
    </div>
  );
};

export default LogSteps;
