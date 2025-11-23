import jwt from "jsonwebtoken";

export default function generateJWT(payload) {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error("JWT_SECRET is not defined in environment variables");
  }

  return jwt.sign(payload, secret, {
    expiresIn: "7d",
  });
}
