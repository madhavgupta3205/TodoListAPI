import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes";
import todoRoutes from "./routes/todoRoutes";
import homeRoutes from "./routes/homeRoutes";

dotenv.config();

const app = express();
app.use(express.json());

app.use("/", homeRoutes); // Use home routes
app.use("/auth", authRoutes);
app.use("/todos", todoRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
import pool from "./utils/db";

pool.query("SELECT NOW()", (err, res) => {
  if (err) {
    console.error("Error connecting to the database:", err);
  } else {
    console.log("Database connected:", res.rows);
  }
});
