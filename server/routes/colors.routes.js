import { Router } from "express";
import { pool } from "../db.js";

const router = Router();

router.get("/:name", async (req, res) => {
  try {
    const name = req.params.name.trim().toLowerCase();

    const result = await pool.query(
      `SELECT id, name, hex, rgb_r, rgb_g, rgb_b
       FROM colors
       WHERE name = $1`,
      [name],
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        is_correct: false,
        message: "В моєму світі такого кольору не існує",
      });
    }

    const color = result.rows[0];

    return res.json({
      is_correct: true,
      color,
    });
  } catch (error) {
    console.error("Error fetching color:", error);

    return res.status(500).json({
      message: "Не вдалося отримати колір із бази даних.",
    });
  }
});

export default router;