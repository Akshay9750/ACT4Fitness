import React, { useState, useContext } from "react";
import { ActivityContext } from "../../Context/ActivityContext"; // Adjust the path accordingly
import mets from "../../Data/mets copy.json";
import { useNavigate } from "react-router-dom";
import { StepsContext } from "../../Context/StepContext"; // Import StepsContext
import "./LogActivity.css";

const LogActivity = () => {
  const { Log } = useContext(ActivityContext);
  const { logActivityCalories } = useContext(StepsContext); // Access the context function
  const [selectedActivity, setSelectedActivity] = useState("");
  const [selectedMotion, setSelectedMotion] = useState("");
  const [durationInMinutes, setDurationInMinutes] = useState(""); // State for duration in minutes

  const navigate = useNavigate();

  const handleActivityChange = (event) => {
    setSelectedActivity(event.target.value);
  };

  const handleMotionChange = (event) => {
    setSelectedMotion(event.target.value);
  };

  const handleDurationChange = (event) => {
    setDurationInMinutes(event.target.value); // Update duration in minutes state
  };

  const activities = mets; // Using the flat array directly

  const filteredMotions = activities.filter(
    (item) => item.activity === selectedActivity
  );

  const handleLogClick = () => {
    if (selectedActivity && selectedMotion && durationInMinutes) {
      const selectedItem = activities.find(
        (item) =>
          item.activity === selectedActivity && item.motion === selectedMotion
      );

      const durationInHours = Number((durationInMinutes / 60).toFixed(2)); // Convert minutes to hours
      const caloriesBurned = selectedItem
        ? selectedItem.met * durationInHours
        : 0; // Calculate calories burned

      const activityToLog = {
        activity: selectedActivity,
        motion: selectedMotion,
        met: selectedItem ? selectedItem.met : null, // Get the MET value
        duration: durationInHours, // Duration in hours
      };

      console.log(activityToLog);
      Log(activityToLog); // Log the activity

      // Log the calories burned in the StepsContext
      // logActivityCalories(caloriesBurned);

      // Optionally reset selections
      setSelectedActivity("");
      setSelectedMotion("");
      setDurationInMinutes(""); // Reset duration

      navigate("/");
    }
  };

  return (
    <div className="log-activity-container">
      <h1 className="log-activity-title">Log Your Activity</h1>
      <label htmlFor="activity">Select Activity:</label>
      <select
        id="activity"
        className="select-input"
        onChange={handleActivityChange}
      >
        <option value="">-- Select Activity --</option>
        {[...new Set(activities.map((item) => item.activity))].map(
          (activity, index) => (
            <option key={index} value={activity}>
              {activity}
            </option>
          )
        )}
      </select>

      <label htmlFor="motion">Select Motion:</label>
      <select
        id="motion"
        className="select-input"
        onChange={handleMotionChange}
        disabled={!selectedActivity}
      >
        <option value="">-- Select Motion --</option>
        {filteredMotions.map((item) => (
          <option key={item.id} value={item.motion}>
            {item.motion} (MET: {item.met})
          </option>
        ))}
      </select>

      <label htmlFor="duration">Duration (in minutes):</label>
      <input
        id="duration"
        className="duration-input"
        type="number"
        value={durationInMinutes}
        onChange={handleDurationChange}
        placeholder="Enter duration in minutes"
        min="0"
      />

      <button className="log-button" onClick={handleLogClick}>
        Log Activity
      </button>
    </div>
  );
};

export default LogActivity;
