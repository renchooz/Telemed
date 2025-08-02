import jwt from "jsonwebtoken";
export const createToken = (id, res) => {
  const token = jwt.sign({ userId: id }, process.env.JWT_SECRET);
  res.cookie("token", token, {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
  return token
};
