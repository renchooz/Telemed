import Session from "../models/Session.js";
import Doctor from "../models/Doctor.js";
import Device from "../models/Device.js";


export const startSession = async (req, res) => {
  try {
    const { deviceId } = req.body;

    if (!deviceId) {
      return res.status(400).json({ msg: "deviceId is required" });
    }

    const device = await Device.findOne({ deviceId });
    if (!device) {
      return res.status(404).json({ msg: "Device not found" });
    }

    const doctor = await Doctor.findOne({ available: true });
    if (!doctor) {
      return res.status(503).json({ msg: "No doctors available right now" });
    }

  
    doctor.available = false;
    await doctor.save();


    const session = await Session.create({
      doctorId: doctor._id,
      deviceId,
    });

    res.status(201).json({
      msg: "Session started",
      sessionId: session._id,
      doctor: {
        id: doctor._id,
        name: doctor.name,
        email: doctor.email,
      },
      startedAt: session.startedAt,
    });
  } catch (err) {
    res.status(500).json({ msg: "Server error", error: err.message });
  }
};



export const getActiveSessions = async (req, res) => {
  try {
    const sessions = await Session.find({ endedAt: null })
      .populate("doctorId", "name email")
      .sort({ createdAt: -1 });

    res.json(sessions);
  } catch (err) {
    res.status(500).json({ msg: "Server error", error: err.message });
  }
};




export const endSession = async (req, res) => {
  try {
    const { sessionId } = req.body;

    const session = await Session.findById(sessionId);
    if (!session) return res.status(404).json({ msg: "Session not found" });

    if (session.endedAt) return res.status(400).json({ msg: "Session already ended" });


    session.endedAt = new Date();
    await session.save();

 
    const doctor = await Doctor.findById(session.doctorId);
    if (doctor) {
      doctor.available = true;
      await doctor.save();
    }

    res.json({ msg: "Session ended successfully" });
  } catch (err) {
    res.status(500).json({ msg: "Server error", error: err.message });
  }
};
