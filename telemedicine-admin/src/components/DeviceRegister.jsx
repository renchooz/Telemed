import { useState } from "react";
import axios from "../api/axios";

const DeviceRegister = () => {
  const [form, setForm] = useState({ deviceId: "", lat: "", lng: "" });
  const [msg, setMsg] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/devices/add", {
        deviceId: form.deviceId,
        gps: { lat: form.lat, lng: form.lng },
      });
      setMsg(res.data.msg);
    } catch (err) {
      setMsg("Failed to register device");
    }
  };

  return (
    <div className="p-4 bg-white shadow rounded mt-4">
      <h2 className="text-lg font-bold mb-3">Register New Device</h2>
      {msg && <p className="text-sm text-blue-600 mb-2">{msg}</p>}
      <form onSubmit={handleSubmit} className="space-y-2">
        <input name="deviceId" placeholder="Device ID" onChange={handleChange} className="border p-2 w-full" />
        <input name="lat" placeholder="Latitude" onChange={handleChange} className="border p-2 w-full" />
        <input name="lng" placeholder="Longitude" onChange={handleChange} className="border p-2 w-full" />
        <button className="bg-blue-600 text-white px-4 py-2 rounded">Register</button>
      </form>
    </div>
  );
};

export default DeviceRegister;