import { useAppContext } from "../context/AppContext";

const OnlineDoctors = () => {
  const { onlineDoctors } = useAppContext();

  return (
    <div className="bg-white shadow-lg rounded-xl p-4">
      <h2 className="text-xl font-semibold mb-3 text-green-700">🟢 Online Doctors</h2>
      {onlineDoctors.length === 0 ? (
        <p className="text-gray-500">No doctors online.</p>
      ) : (
        <ul className="space-y-2">
          {onlineDoctors.map((doc) => (
            <li key={doc._id} className="text-gray-800">
              <span className="font-medium">{doc.name}</span> ({doc.email})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default OnlineDoctors;
