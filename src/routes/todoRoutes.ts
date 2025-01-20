// src/routes/todoRoutes.ts
import { Router } from "express";
import {
  getTodos,
  createTodo,
  getTodoById,
  updateTodo,
  deleteTodo,
} from "../controllers/todoController";
import { authenticateJWT } from "../middlewares/authMiddleware";

const router = Router();

router.get("/", authenticateJWT, getTodos);
router.post("/", authenticateJWT, createTodo);
router.get("/:todoId", authenticateJWT, getTodoById); // Get a specific todo
router.put("/:todoId", authenticateJWT, updateTodo); // Update a specific todo
router.delete("/:todoId", authenticateJWT, deleteTodo); // Delete a specific todo

export default router;
