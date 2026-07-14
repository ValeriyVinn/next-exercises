import express from "express";
import cors from "cors";
import userProfileRoutes from "./routes/user-profile.routes";

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
app.use(express.json());

// API
app.use("/api/user-profile", userProfileRoutes);

app.get("/api/health", (req, res) => {
  res.json({ ok: true });
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
