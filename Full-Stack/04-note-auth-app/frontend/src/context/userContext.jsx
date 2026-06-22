import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

export const userContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true); // ← prevents flash of wrong UI

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("accessToken");

      if (!token) {
        setAuthLoading(false);
        return;
      }

      // for instant get data for local
      const cachedUser = localStorage.getItem("user");
      if (cachedUser) {
        setUser(JSON.parse(cachedUser));
      }

      try {
        const res = await axios.get("http://localhost:3000/api/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(res.data.user);
        // for instant set data for local
        localStorage.setItem("user", JSON.stringify(res.data.user));
      } catch (err) {
        // token invalid or expired — clear it
        localStorage.removeItem("accessToken");
        localStorage.removeItem("user");
        setUser(null);
      } finally {
        setAuthLoading(false);
      }
    };

    fetchUser();
  }, []);

  const updateUser = (userData) => {
    setUser(userData);
    if (userData) {
        localStorage.setItem('user', JSON.stringify(userData))
    }
    else {
        localStorage.removeItem('user')
    }
  };

  return (
    <userContext.Provider value={{ user, setUser: updateUser, authLoading }}>
      {children}
    </userContext.Provider>
  );
};

export const getData = () => useContext(userContext);
