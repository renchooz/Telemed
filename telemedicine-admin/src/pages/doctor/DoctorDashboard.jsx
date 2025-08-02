import StartSession from "../../components/StartSession";
import { useAppContext } from "../../context/AppContext";

const DoctorDashboard = () => {
  const { currentDoctor, toggleAvailability, logout } = useAppContext();
console.log(currentDoctor.name)
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex justify-between mb-6">
        <h2 className="text-2xl font-bold">👨‍⚕️ Welcome, {currentDoctor.name}</h2>
        <button
          className="bg-red-500 text-white px-4 py-2 rounded"
          onClick={logout}
        >
          Logout
        </button>
      </div>

      <div className="bg-white p-4 rounded shadow">
        <p className="text-lg">
          Availability:{" "}
          <span className={currentDoctor?.available ? "text-green-600" : "text-gray-500"}>
            {currentDoctor?.available ? "Available" : "Not Available"}
          </span>
        </p>
        <button
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
          onClick={toggleAvailability}
        >
          Toggle Availability
        </button>
        <StartSession/>
      </div>
    </div>
  );
};

export default DoctorDashboard;
