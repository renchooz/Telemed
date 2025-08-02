
import { useEffect, useState } from "react";
import axios from "../api/axios";

const DeviceMap = () => {
  const [devices, setDevices] = useState([]);

  useEffect(() => {
    const fetchDevices = async () => {
      try {
        const { data } = await axios.get("/devices/all");
        setDevices(data);
      } catch (err) {
        console.error("Error fetching devices:", err);
      }
    };
    fetchDevices();
  }, []);

  return (
    <div className="p-4 bg-white shadow rounded">
      <h2 className="text-lg font-bold mb-3">📍 Devices</h2>
      <ul className="text-sm text-gray-700 space-y-1 max-h-40 overflow-auto">
        {devices.map((d, i) => (
          <li key={i}>
            ID: <span className="font-mono">{d.deviceId}</span> | GPS: {d.gps.lat}, {d.gps.lng}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DeviceMap;
