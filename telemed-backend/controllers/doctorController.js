import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Doctor from "../models/Doctor.js";
import { createToken } from "../config/jwt.js";

export const registerDoctor = async (req, res) => {
  const { name, email, password } = req.body;
  if(!name||!email||!password) return res.status(400).json({msg:"all fields re required"})
  const existing = await Doctor.findOne({ email });
  if (existing) return res.status(400).json({ msg: "Email already used" });

  const hashedPassword = await bcrypt.hash(password, 10);
  const doctor = await Doctor.create({ name, email, password: hashedPassword });
  await createToken(doctor._id, res);
  res.json({ msg: "account created" });
};

export const loginDoctor = async (req, res) => {
  const { email, password } = req.body;
  const doctor = await Doctor.findOne({ email });
  if (!doctor) return res.status(400).json({ msg: "Doctor not found" });

  const match = await bcrypt.compare(password, doctor.password);
  if (!match) return res.status(400).json({ msg: "Wrong password" });

  await createToken(doctor._id, res);
  res.json({ msg: "Logged in" });
};

export const toggleAvailability = async (req, res) => {
  const doctor = await Doctor.findById(req.user._id);
  doctor.available = !doctor.available;
  await doctor.save();
  res.json({ available: doctor.available });
};

export const getOnlineDoctors = async (req, res) => {
  const doctors = await Doctor.find({ available: true }).select("-password");
  res.json(doctors);
};
export const Logout = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
  });
  res.json({msg:"Logged Out"})
};
export const getDoctor = (req,res)=>{
  try {
    res.status(200).json({doctor:req.user})
  } catch (error) {
    res.status(500).json({msg:"not found"})
  }
}