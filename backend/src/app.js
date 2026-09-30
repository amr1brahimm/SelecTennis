require("dotenv").config();

const express = require("express");
const cors = require("cors");
const pool = require("./config/database");
const authRoutes = require("./routes/authRoutes");
const profileRoutes = require("./routes/profileRoutes");
const racketRoutes = require("./routes/racketRoutes");
const questionnaireRoutes = require("./routes/questionnaireRoutes");
const recommendationRoutes = require("./routes/recommendationRoutes");
const authenticateToken = require("./middleware/authMiddleware");
const app = express();

app.use((req, res, next) => {
  console.log(`${req.method} ${req.originalUrl}`);
  next();
});

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/rackets", racketRoutes);
app.use("/api/questionnaire", questionnaireRoutes);
app.use("/api/recommendations", recommendationRoutes);
app.get("/api/protected", authenticateToken, (req, res) => {
  res.json({
    message: "You are authenticated",
    user: req.user,
  });
});
app.get("/api/health", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");

    res.json({
      status: "ok",
      database: "connected",
      databaseTime: result.rows[0].now,
    });
  } catch (error) {
    console.error("Database connection failed:", error);

    res.status(500).json({
      status: "error",
      database: "disconnected",
    });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`SelecTennis backend running on port ${PORT}`);
});
