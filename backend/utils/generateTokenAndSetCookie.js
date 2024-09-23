import jwt from "jsonwebtoken";

export const generateTokenAndSetCookie = (res, userId) => {
  const token  = jwt.sign({userId}, process.env.JWT_SECRET, {
    expiresIn: "7d"
  })

  res.cookie("token", token , {
    httpOnly: true, // Cookie cannot be accessible by client side js (prevent a XSS attack )
    secure: process.env.NODE_ENV === "production",
    sameSite: "Strict", // Prevent a csrf attack 
    maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
  })

  return token
}