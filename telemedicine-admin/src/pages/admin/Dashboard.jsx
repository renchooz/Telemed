import { useAppContext } from "../../context/AppContext";
import OnlineDoctors from "../../components/OnlineDoctors";
import ActiveSessions from "../../components/ActiveSessions";
import DeviceMap from "../../components/DeviceMap";
import { useNavigate } from "react-router-dom";
import DeviceRegister from "../../components/DeviceRegister";

const Dashboard = () => {
  const { logout, currentDoctor } = useAppContext();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 relative">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">🧑‍⚕️ Welcome</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <OnlineDoctors />
        <ActiveSessions />
        <DeviceMap />
        <DeviceRegister />
      </div>
    </div>
  );
};

export default Dashboard;
