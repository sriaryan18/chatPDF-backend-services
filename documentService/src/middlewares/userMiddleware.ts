import { Request, Response } from "express";
import { decodeJWT } from "../libs/JWT";

export const authenticateRequest = (
  req: Request,
  res: Response,
  next: Function
) => {
  const token = req.headers["authorization"];
  if (token) {
    const userDetails = decodeJWT(token);
    if (userDetails) {
      req = Object.assign(userDetails, req);
      next();
    }
  } else {
    res
      .status(401)
      .send({ message: "Unauthorized access to document service" });
  }
};
