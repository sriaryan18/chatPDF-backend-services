import jwt from "jsonwebtoken";

export const decodeJWT = (token: string) => {
  if (!token) return null;
  const jwtSecret = process.env.JWT_SECRET;
  if (!jwtSecret) return null;
  const userDetails = jwt.verify(token, jwtSecret);
  console.log(userDetails);
  return userDetails;
};
