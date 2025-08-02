import Device from "../models/Device.js";

export const registerDevice = async (req, res) => {
  try {
    const { deviceId, gps } = req.body;

    if (!deviceId || !gps?.lat || !gps?.lng) {
      return res.status(400).json({ msg: "All fields are required" });
    }

    const exists = await Device.findOne({ deviceId });
    if (exists) {
      return res.status(409).json({ msg: "Device already registered" });
    }

    const device = await Device.create({ deviceId, gps });
    res.status(201).json({ msg: "Device registered", device });
  } catch (err) {
    res.status(500).json({ msg: "Server error", error: err.message });
  }
};

export const getAllDevices = async (req, res) => {
  try {
    const devices = await Device.find();
    res.json(devices);
  } catch (err) {
    res.status(500).json({ msg: "Server error", error: err.message });
  }
};
