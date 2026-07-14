import { Router } from "express";
import user from "../data/user-profile.json";

const router = Router();

// GET user
router.get("/", (req, res) => {
  res.json(user);
});

// PATCH role
router.patch("/role", (req, res) => {
  const { role } = req.body;

  if (!role) {
    return res.status(400).json({ message: "Role is required" });
  }

  user.role = role;

  res.json(user);
});

export default router;