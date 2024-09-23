import React, { useContext, useState } from "react";
import { UserContext } from "../../Context/UserContext";
import { useNavigate } from "react-router-dom";
import "./UserStats.css";

const UserStats = () => {
  const { userDetails, updateUserDetails } = useContext(UserContext);
  const navigate = useNavigate();

  // Local state to manage form inputs
  const [formData, setFormData] = useState({
    name: userDetails.name || "",
    height: userDetails.height || "",
    weight: userDetails.weight || "",
    goalWeight: userDetails.goalWeight || "", // Add goal weight
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const submitDetails = (event) => {
    event.preventDefault();
    // Ensure goal weight is less than current weight
    if (formData.goalWeight >= formData.weight) {
      alert("Goal weight must be less than current weight.");
      return;
    }
    updateUserDetails(formData); // Update userDetails with form data
    navigate("/");
  };

  return (
    <div className="user-stats-container">
      <form className="user-stats-form" onSubmit={submitDetails}>
        <h1>User Stats</h1>
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

        <button type="submit">Submit</button>
      </form>
      {userDetails.name && (
        <div className="user-details">
          <h2>User Details</h2>
          <p>Name: {userDetails.name}</p>
          <p>Height: {userDetails.height}</p>
          <p>Weight: {userDetails.weight}</p>
          <p>Goal Weight: {userDetails.goalWeight}</p>{" "}
          {/* Display goal weight */}
        </div>
      )}
    </div>
  );
};

export default UserStats;
