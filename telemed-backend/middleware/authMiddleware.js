import jwt from 'jsonwebtoken';
import Doctor from '../models/Doctor.js';

export const protect = async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ msg: "Not authenticated" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const doctor = await Doctor.findById(decoded.userId).select('-password');
    if (!doctor) {
      return res.status(401).json({ msg: "User not found" });
    }

    req.user = doctor;
    next();
  } catch (err) {
    res.status(401).json({ msg: "Invalid or expired token" });
  }
};
