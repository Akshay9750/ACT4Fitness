import React, { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userDetails, setUserDetails] = useState(() => {
    const storedUserDetails = localStorage.getItem("userDetails");
    return storedUserDetails ? JSON.parse(storedUserDetails) : {};
  });

  useEffect(() => {
    localStorage.setItem("userDetails", JSON.stringify(userDetails));
  }, [userDetails]);

  const updateUserDetails = (details) => {
    setUserDetails(details);
  };

  const deleteUser = () => {
    setUserDetails({});
  };

  return (
    <UserContext.Provider
      value={{ userDetails, updateUserDetails, deleteUser }}
    >
      {children}
    </UserContext.Provider>
  );
};
