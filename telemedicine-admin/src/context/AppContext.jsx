import { createContext, useContext, useEffect, useState } from "react";
import axios from "../api/axios";
import { getSocket } from "../socket/socket";
import { Navigate, useNavigate } from "react-router-dom";

export const AppContext = createContext();

export const ContextProvider = ({ children }) => {
  const [onlineDoctors, setOnlineDoctors] = useState([]);
  const [activeSessions, setActiveSessions] = useState([]);
  const [currentDoctor, setCurrentDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formLoading, setFormLoading] = useState(false);
const navigate = useNavigate()
  const [error, setError] = useState("");

  const socket = getSocket();

  const fetchOnlineDoctors = async () => {
    try {
      const { data } = await axios.get("/doctors/onlinedr");
      setOnlineDoctors(data);
    } catch (err) {
      console.error("Failed to fetch online doctors:", err);
    }
  };

  const fetchActiveSessions = async () => {
    try {
      const { data } = await axios.get("/sessions/active");
      setActiveSessions(data);
    } catch (err) {
      console.error("Failed to fetch sessions:", err);
    }
  };

  const fetchCurrentDoctor = async () => {
    try {
      const { data } = await axios.get("/doctors/getdr");
      setCurrentDoctor(data.doctor);
    } catch (err) {
      setCurrentDoctor(null); 
    } finally {
      setLoading(false);
    }
  };

  const login = async (form) => {
    setFormLoading(true);
    setError("");
    try {
      await axios.post("/doctors/login", form);
      await fetchCurrentDoctor();
    } catch (err) {
      console.error("Login error:", err);
      setError(err.response?.data?.msg || "Login failed");
    } finally {
      setFormLoading(false);
    }
  };

  const register = async (form) => {
  setFormLoading(true);
  setError("");

  try {
    await axios.post("/doctors/register", form);
    await fetchCurrentDoctor(); // auto-login after register
  } catch (err) {
    const msg =
      err?.response?.data?.msg || "Something went wrong. Try again.";
    setError(msg);
  } finally {
    setFormLoading(false);
  }
};
const logout = async () => {
  try {
    await axios.get("/doctors/logout");
    setCurrentDoctor(null);
  } catch (err) {
    console.error("Logout failed:", err);
  }
};
const toggleAvailability = async () => {
  try {
    const { data } = await axios.put("/doctors/avalibility");
    setCurrentDoctor((prev) => ({ ...prev, available: data.available }));
  } catch (err) {
    console.error("Failed to toggle availability:", err);
  }
};



  useEffect(() => {
    fetchCurrentDoctor();
    fetchOnlineDoctors();
    fetchActiveSessions();

    socket.on("doctorStatusUpdated", fetchOnlineDoctors);

    return () => {
      socket.off("doctorStatusUpdated", fetchOnlineDoctors);
    };
  }, []);

  const value = {
    onlineDoctors,
    activeSessions,
    currentDoctor,
    fetchOnlineDoctors,
    fetchActiveSessions,
    fetchCurrentDoctor,
    login,
    loading,
    formLoading,
    error,
    register,
    logout,
    navigate,
    toggleAvailability
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => useContext(AppContext);
