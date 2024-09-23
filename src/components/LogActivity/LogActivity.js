import React, { useState, useContext } from "react";
import { ActivityContext } from "../../Context/ActivityContext";
import mets from "../../Data/mets copy.json";
import { useNavigate } from "react-router-dom";
import "./LogActivity.css";

const LogActivity = () => {
  const { logActivity } = useContext(ActivityContext);
  const [selectedActivity, setSelectedActivity] = useState("");
  const [selectedMotion, setSelectedMotion] = useState("");
  const [durationInMinutes, setDurationInMinutes] = useState("");

  const navigate = useNavigate();

  const handleActivityChange = (event) => {
    setSelectedActivity(event.target.value);
  };

  const handleMotionChange = (event) => {
    setSelectedMotion(event.target.value);
  };

  const handleDurationChange = (event) => {
    setDurationInMinutes(event.target.value);
  };

  const activities = mets;

  const filteredMotions = activities.filter(
    (item) => item.activity === selectedActivity
  );

  const handleLogClick = () => {
    if (selectedActivity && selectedMotion && durationInMinutes) {
      const selectedItem = activities.find(
        (item) =>
          item.activity === selectedActivity && item.motion === selectedMotion
      );

      const durationInHours = Number((durationInMinutes / 60).toFixed(2));
      const activityToLog = {
        activity: selectedActivity,
        motion: selectedMotion,
        met: selectedItem ? selectedItem.met : null,
        duration: durationInHours,
      };

      const currentDate = new Date().toISOString().split("T")[0];
      logActivity(activityToLog, currentDate);

      setSelectedActivity("");
      setSelectedMotion("");
      setDurationInMinutes("");

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
