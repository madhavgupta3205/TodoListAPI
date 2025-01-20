// src/middlewares/authMiddleware.ts
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const authenticateJWT = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const token = req.header("Authorization")?.split(" ")[1];
  if (!token) {
    res.status(401).send("Access denied");
    return; // Ensure the function exits after sending a response
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    (req as any).userId = (decoded as any).id; // Temporarily cast req to any
    next(); // Call next() to pass control to the next middleware
  } catch (err) {
    res.status(400).send("Invalid token");
  }
};
