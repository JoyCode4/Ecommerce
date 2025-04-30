import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || "secret123";

export const signJwtToken = (payload: object) => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "7d" });
};

export const verifyJwtToken = (token: string) => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    return null;
  }
};