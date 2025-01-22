import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/authRoutes";
import todoRoutes from "./routes/todoRoutes";
import homeRoutes from "./routes/homeRoutes";
import pool from "./utils/db";

dotenv.config(); 

const app = express();

app.use(express.json());


app.use(
  cors({
    origin: "*", 
    methods: ["GET", "POST", "PUT", "DELETE"], 
    allowedHeaders: ["Content-Type", "Authorization"], 
  })
);

app.use("/", homeRoutes); 
app.use("/auth", authRoutes); 
app.use("/todos", todoRoutes); 


pool.query("SELECT NOW()", (err, res) => {
  if (err) {
    console.error("Error connecting to the database:", err);
  } else {
    console.log("Database connected:", res.rows[0]);
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
