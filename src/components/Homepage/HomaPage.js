import React, { createContext, useContext, useEffect } from "react";
import { ActivityContext } from "../../Context/ActivityContext";
import { Link } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";
import ProgressDial from "../ProgressDial/ProgressDial";
import { StepsContext } from "../../Context/StepContext";
import "./HomePage.css";

const HomePage = () => {
  const { activities, setActivities } = useContext(ActivityContext); // Get the logged activities
  const { userDetails } = useContext(UserContext);
  const { steps, caloriesFromSteps, stepLogs } = useContext(StepsContext);

  // Calculate total calories from activities
  const calculateActivityCalories = () => {
    return activities.reduce((total, activity) => {
      const met = activity.met || 0; // Default to 0
      const weight = userDetails.weight || 0; // Default to 0
      const duration = activity.duration || 0; // Default to 0
      const caloriesBurned = met * weight * duration;
      return total + caloriesBurned;
    }, 0);
  };

  // Calculate total calories from step logs
  const calculateStepsCalories = () => {
    return stepLogs.reduce((total, log) => total + log.calories, 0);
  };
  const totalCalories = calculateActivityCalories() + calculateStepsCalories();

  const handleDelete = (index) => {
    const updatedActivities = activities.filter((_, i) => i !== index);
    setActivities(updatedActivities);
    localStorage.setItem("activities", JSON.stringify(updatedActivities)); // Update local storage
  };

  return (
    <div className="home-page">
      <header className="header">
        <h1>Act4Fitness</h1>
      </header>
      <nav className="navigation">
        <Link to="/log-activity">Log Activity</Link>
        <Link to="/log-steps">Log Steps</Link>
        <Link to="/user-stats">User Stats</Link>
      </nav>

      <section className="activities-section">
        <h2 className="activities-title">Logged Activities:</h2>
        <div className="activities-divider"></div>
        {activities.length > 0 ? (
          <div className="activities-container">
            {activities.map((activity, index) => {
              const met = activity.met || 0;
              const weight = userDetails.weight || 0;
              const duration = activity.duration || 0;
              const caloriesBurned = met * weight * duration;

              return (
                <div key={index} className="activity-card">
                  <h3 className="activity-name">{activity.activity}</h3>
                  <p className="activity-details">
                    <strong>Motion:</strong> {activity.motion} |
                    <strong> MET:</strong> {met} |<strong> Duration:</strong>{" "}
                    {duration} hours
                  </p>
                  <p className="activity-calories">
                    <strong>Calories Burned:</strong>{" "}
                    {caloriesBurned.toFixed(2)}
                  </p>
                  <button
                    className="delete-button"
                    onClick={() => handleDelete(index)}
                  >
                    Delete
                  </button>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="no-activities">No activities logged yet.</p>
        )}
      </section>

      <div className="progress-dials">
        <ProgressDial
          label="10K Steps"
          unit="Steps"
          value={stepLogs.reduce((total, log) => total + log.steps, 0)} // Total steps from logs
          maxValue={10000}
        />
        <ProgressDial
          label="Cals Burned"
          value={totalCalories.toFixed(2)}
          unit={"Cals"}
          maxValue={10000}
        />

        {/* <ProgressDial
          label="Goal Weight"
          value={userDetails.weight / userDetails.goalWeight || 0}
          unit={"%"}
          maxValue={100}
        /> */}
      </div>
    </div>
  );
};

export default HomePage;
