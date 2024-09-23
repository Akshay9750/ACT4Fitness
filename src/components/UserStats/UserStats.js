import React, { useContext, useState } from "react";
import { UserContext } from "../../Context/UserContext";
import { ActivityContext } from "../../Context/ActivityContext";
import { StepsContext } from "../../Context/StepContext";
import { useNavigate, Link } from "react-router-dom";
import "./UserStats.css";

const UserStats = () => {
  const { userDetails, updateUserDetails, deleteUser } =
    useContext(UserContext);
  const { setActivities } = useContext(ActivityContext);
  const { setStepLogs } = useContext(StepsContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: userDetails.name || "",
    height: userDetails.height || "",
    weight: userDetails.weight || "",
    goalWeight: userDetails.goalWeight || "",
  });

  const [showConfirmDelete, setShowConfirmDelete] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const submitDetails = (event) => {
    event.preventDefault();
    if (formData.goalWeight >= formData.weight) {
      alert("Goal weight must be less than current weight.");
      return;
    }
    updateUserDetails(formData);
    navigate("/");
  };

  const handleDeleteUser = () => {
    setShowConfirmDelete(true);
  };

  const confirmDeleteUser = () => {
    deleteUser();
    setActivities({});
    // setStepLogs({});
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="user-stats-container">
      <Link to="/" className="home-button">
        Back to Homepage
      </Link>

      {Object.keys(userDetails).length === 0 ? (
        <form className="user-stats-form" onSubmit={submitDetails}>
          <h1>Create User Profile</h1>
          <label>Name</label>
          <input
            type="text"
            name="name"
            placeholder="Enter your name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <label>Height</label>
          <input
            type="text"
            name="height"
            placeholder="Enter your height"
            value={formData.height}
            onChange={handleChange}
            required
          />
          <label>Weight</label>
          <input
            type="number"
            name="weight"
            placeholder="Enter your weight"
            value={formData.weight}
            onChange={handleChange}
            required
          />
          <label>Goal Weight</label>
          <input
            type="number"
            name="goalWeight"
            placeholder="Enter your goal weight"
            value={formData.goalWeight}
            onChange={handleChange}
            required
          />
          <button type="submit">Create Profile</button>
        </form>
      ) : (
        <div className="user-details">
          <h1>User Profile</h1>
          <p>
            <strong>Name:</strong> {userDetails.name}
          </p>
          <p>
            <strong>Height:</strong> {userDetails.height}
          </p>
          <p>
            <strong>Weight:</strong> {userDetails.weight}
          </p>
          <p>
            <strong>Goal Weight:</strong> {userDetails.goalWeight}
          </p>
          <button className="delete-user-button" onClick={handleDeleteUser}>
            Delete User
          </button>
        </div>
      )}

      {showConfirmDelete && (
        <div className="confirm-delete-modal">
          <p>
            Are you sure you want to delete all user data? This action cannot be
            undone.
          </p>
          <button onClick={confirmDeleteUser}>Yes, Delete All Data</button>
          <button onClick={() => setShowConfirmDelete(false)}>Cancel</button>
        </div>
      )}
    </div>
  );
};

export default UserStats;
