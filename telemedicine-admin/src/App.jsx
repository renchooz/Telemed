import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import { useAppContext } from "./context/AppContext";

// Admin
import AdminDashboard from "./pages/admin/Dashboard";

// Doctor
import DoctorLogin from "./pages/doctor/Login";
import DoctorRegister from "./pages/doctor/Register";
import DoctorDashboard from "./pages/doctor/DoctorDashboard";

const App = () => {
  const { currentDoctor, loading } = useAppContext();

  if (loading) return <p className="text-center mt-20">Loading...</p>;

  return (
    <Routes>
    
      <Route
        path="/admin"
        element={currentDoctor ? <AdminDashboard /> : <Navigate to="/doctor/login" />}
      />

      
      <Route
        path="/doctor/login"
        element={!currentDoctor ? <DoctorLogin /> : <Navigate to="/doctor/dashboard" />}
      />
      <Route
        path="/doctor/register"
        element={!currentDoctor ? <DoctorRegister /> : <Navigate to="/doctor/dashboard" />}
      />

  
      <Route
        path="/doctor/dashboard"
        element={currentDoctor ? <DoctorDashboard /> : <Navigate to="/doctor/login" />}
      />

      
      <Route
        path="/"
        element={<Navigate to={currentDoctor ? "/doctor/dashboard" : "/doctor/login"} />}
      />
    </Routes>
  );
};

export default App;
