import React, { useState, useContext } from "react";
import { ActivityContext } from "../../Context/ActivityContext";
import { StepsContext } from "../../Context/StepContext";
import { UserContext } from "../../Context/UserContext";
import { Link } from "react-router-dom";
import ProgressDial from "../ProgressDial/ProgressDial";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./HomePage.css";

const HomePage = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const { activities, setActivities } = useContext(ActivityContext);
  const { stepLogs } = useContext(StepsContext);
  const { userDetails } = useContext(UserContext);

  const formatDate = (date) => {
    return date.toISOString().split("T")[0];
  };

  const dateKey = formatDate(selectedDate);
  const today = formatDate(new Date());
  const dayActivities = activities[dateKey] || [];
  const daySteps = stepLogs[dateKey] || [];

  const calculateTotalCalories = () => {
    const activityCalories = dayActivities.reduce((total, activity) => {
      const met = activity.met || 0;
      const weight = userDetails.weight || 0;
      const duration = activity.duration || 0;
      return total + met * weight * duration;
    }, 0);

    const stepCalories = daySteps.reduce(
      (total, log) => total + log.calories,
      0
    );

    return activityCalories + stepCalories;
  };

  const handleDelete = (index) => {
    if (dateKey === today) {
      const updatedActivities = {
        ...activities,
        [dateKey]: activities[dateKey].filter((_, i) => i !== index),
      };
      setActivities(updatedActivities);
    } else {
      alert("You can only delete activities for the current date.");
    }
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

      <div className="date-picker-container">
        <DatePicker
          selected={selectedDate}
          onChange={(date) => setSelectedDate(date)}
          dateFormat="MMMM d, yyyy"
          className="custom-datepicker"
          calendarClassName="custom-calendar"
        />
      </div>

      <div className="progress-dials-container">
        <div className="progress-dial-wrapper">
          <ProgressDial
            label="10K Steps"
            unit="Steps"
            value={daySteps.reduce((total, log) => total + log.steps, 0)}
            maxValue={10000}
          />
        </div>
        <div className="progress-dial-wrapper">
          <ProgressDial
            label="Cals Burned"
            value={calculateTotalCalories().toFixed(2)}
            unit="Cals"
            maxValue={10000}
          />
        </div>
      </div>

      <section className="activities-section">
        <h2 className="activities-title">Logged Activities for {dateKey}:</h2>
        <div className="activities-divider"></div>
        {dayActivities.length > 0 ? (
          <div className="activities-container">
            {dayActivities.map((activity, index) => {
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
                    className={`delete-button ${
                      dateKey !== today ? "disabled" : ""
                    }`}
                    onClick={() => handleDelete(index)}
                    disabled={dateKey !== today}
                  >
                    Delete
                  </button>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="no-activities">No activities logged for this date.</p>
        )}
      </section>
    </div>
  );
};

export default HomePage;
