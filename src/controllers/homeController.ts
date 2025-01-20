// src/controllers/homeController.ts
import { Request, Response } from "express";

export const home = (req: Request, res: Response) => {
  res.json({
    message: "To-Do List API",
    routes: {
      "/auth/signup": "Create a new user",
      "/auth/login": "Log in a user",
      "/todos": {
        GET: "Get all todos for the logged-in user",
        POST: "Create a new todo for the logged-in user",
        "/:todoId": {
          GET: "Get a specific todo by ID",
          PUT: "Update a specific todo by ID",
          DELETE: "Delete a specific todo by ID",
        },
      },
    },
  });
};
