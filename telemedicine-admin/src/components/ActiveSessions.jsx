import { useAppContext } from "../context/AppContext";

const ActiveSessions = () => {
  const { activeSessions } = useAppContext();

  return (
    <div className="bg-white shadow-lg rounded-xl p-4">
      <h2 className="text-xl font-semibold mb-3 text-blue-700">🩺 Active Sessions</h2>
      {activeSessions.length === 0 ? (
        <p className="text-gray-500">No active sessions.</p>
      ) : (
        <ul className="space-y-2">
          {activeSessions.map((s) => (
            <li key={s._id} className="text-gray-800">
              Dr. <strong>{s.doctorId.name}</strong> ↔ Device #{s.deviceId}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ActiveSessions;
