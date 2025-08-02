import mongoose from "mongoose";
const deviceSchema = new mongoose.Schema(
  {
    deviceId: { type: String, unique: true, required: true },
    gps: {
      lat: { type: Number, required: true },
      lng: { type: Number, required: true },
    },
  },
  { timestamps: true }
);

const Device = mongoose.model("Device", deviceSchema);
export default Device;
