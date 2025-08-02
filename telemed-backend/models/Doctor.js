import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  available: { type: Boolean, default: false },
});

const Doctor =  mongoose.model("Doctor", doctorSchema);
export default Doctor
