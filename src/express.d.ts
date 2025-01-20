// src/express.d.ts
import "express";

declare module "express-serve-static-core" {
  interface Request {
    userId?: number; // Add the userId property to the Request interface
  }
}
