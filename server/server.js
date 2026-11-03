import "dotenv/config";
import express from "express";
import cors from "cors";
import colorsRoutes from "./routes/colors.routes.js";
import { pool } from "./db.js";

const app = express();
const PORT = Number(process.env.PORT) || 4000;

app.use(
  cors({
    origin: [
      "http://localhost:5500",
      "http://127.0.0.1:5500",
      "http://localhost:3000",
    ],
  }),
);

app.use(express.json());
app.use("/api/colors", colorsRoutes);
// Перевірка доступності сервера
app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    message: "Vanilla Express server is running",
  });
});

// Отримання випадкового кольору відповіді
app.get("/api/answer-color", async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT is_correct, color
      FROM answer_colors
      ORDER BY random()
      LIMIT 1
    `);

    if (result.rows.length === 0) {
      return res.status(404).json({
        error: "No answer colors found",
      });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error fetching answer color:", error);

    res.status(500).json({
      error: "Failed to fetch answer color",
    });
  }
});

app.listen(PORT, () => {
  console.log(`Express server running at http://localhost:${PORT}`);
});