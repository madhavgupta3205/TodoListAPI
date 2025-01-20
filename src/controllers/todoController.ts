// src/controllers/todoController.ts
import { Request, Response } from "express";
import pool from "../utils/db";

export const getTodos = async (req: Request, res: Response) => {
  const userId = (req as any).userId; // Temporarily cast req to any
  try {
    const result = await pool.query("SELECT * FROM todos WHERE user_id = $1", [
      userId,
    ]);
    res.json(result.rows);
  } catch (err) {
    res.status(500).send("Server error");
  }
};

export const createTodo = async (req: Request, res: Response) => {
  const userId = (req as any).userId; // Temporarily cast req to any
  const { title } = req.body;
  try {
    // Get the current max todo_id for the user
    const result = await pool.query(
      "SELECT COALESCE(MAX(todo_id), 0) + 1 AS next_todo_id FROM todos WHERE user_id = $1",
      [userId]
    );
    const nextTodoId = result.rows[0].next_todo_id;

    // Insert the new todo with the calculated todo_id
    const insertResult = await pool.query(
      "INSERT INTO todos (user_id, todo_id, title, completed) VALUES ($1, $2, $3, $4) RETURNING todo_id",
      [userId, nextTodoId, title, false]
    );

    res.status(201).json({ todoId: insertResult.rows[0].todo_id });
  } catch (err) {
    console.error("Error creating todo:", err);
    res.status(500).send("Error creating todo");
  }
};

export const getTodoById = async (
  req: Request,
  res: Response
): Promise<void> => {
  const userId = (req as any).userId; // Temporarily cast req to any
  const { todoId } = req.params; // Get todoId from the request parameters

  try {
    const result = await pool.query(
      "SELECT * FROM todos WHERE user_id = $1 AND todo_id = $2",
      [userId, todoId]
    );

    if (result.rows.length === 0) {
      res.status(404).send("Todo not found");
      return; // Ensure the function exits after sending a response
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error("Error retrieving todo:", err);
    res.status(500).send("Server error");
  }
};


export const updateTodo = async (req: Request, res: Response): Promise<void> => {
  const userId = (req as any).userId; // Temporarily cast req to any
  const { todoId } = req.params; // Get todoId from the request parameters
  const { title, completed } = req.body; // Get title and completed status from the request body

  try {
    // Build the update query dynamically based on provided parameters
    const updates: string[] = [];
    const values: any[] = [];

    if (title !== undefined) {
      updates.push('title = $' + (values.length + 1));
      values.push(title);
    }

    if (completed !== undefined) {
      updates.push('completed = $' + (values.length + 1));
      values.push(completed);
    }

    // If no updates are provided, return a 400 error
    if (updates.length === 0) {
      res.status(400).send('No fields to update');
      return;
    }

    // Add userId and todoId to the values array
    values.push(userId, todoId);

    // Construct the final query
    const query = `UPDATE todos SET ${updates.join(', ')} WHERE user_id = $${values.length - 1} AND todo_id = $${values.length} RETURNING *`;

    const result = await pool.query(query, values);

    if (result.rows.length === 0) {
      res.status(404).send('Todo not found');
      return; 
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error updating todo:', err);
    res.status(500).send('Error updating todo');
  }
};


export const deleteTodo = async (req: Request, res: Response): Promise<void> => {
  const userId = (req as any).userId; // Temporarily cast req to any
  const { todoId } = req.params; // Get todoId from the request parameters

  try {
    const result = await pool.query(
      'DELETE FROM todos WHERE user_id = $1 AND todo_id = $2 RETURNING *',
      [userId, todoId]
    );

    if (result.rows.length === 0) {
      res.status(404).send('Todo not found');
      return; // Ensure the function exits after sending a response
    }

    res.status(204).send(); // No content to send back
  } catch (err) {
    console.error('Error deleting todo:', err);
    res.status(500).send('Error deleting todo');
  }
};