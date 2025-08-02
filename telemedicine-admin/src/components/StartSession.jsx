import { useState } from "react";
import axios from "../api/axios";

const StartSession = () => {
  const [deviceId, setDeviceId] = useState("");
  const [result, setResult] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/sessions/start", { deviceId });
      setResult(data);
    } catch (err) {
      setResult({ msg: "Failed to start session" });
    }
  };

  return (
    <div className="p-4 bg-white shadow rounded mt-4">
      <h2 className="text-lg font-bold mb-3">Start Session</h2>
      <form onSubmit={handleSubmit} className="space-y-2">
        <input
          type="text"
          value={deviceId}
          onChange={(e) => setDeviceId(e.target.value)}
          placeholder="Device ID"
          className="border p-2 w-full"
        />
        <button className="bg-green-600 text-white px-4 py-2 rounded">Start Session</button>
      </form>
      {result && (
        <div className="mt-3 text-sm text-gray-800">
          <pre>{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default StartSession;
