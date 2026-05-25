import express from "express";
import cors from "cors";
import "dotenv/config";

import submissionsRouter from "./routes/submissions.js";
import answersRouter from "./routes/answers.js";

const app = express();
const PORT = process.env.PORT || 5000;

// ── Middleware ────────────────────────────────────────────────────────────────

app.use(cors({
  origin: [
    process.env.CLIENT_URL || "http://localhost:3000",
    // Chrome extensions have a chrome-extension:// origin
    /^chrome-extension:\/\//,
  ],
  credentials: true,
}));

app.use(express.json());

// ── Routes ────────────────────────────────────────────────────────────────────

app.get("/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

app.use("/submissions", submissionsRouter);
app.use("/answers", answersRouter);

// ── 404 handler ───────────────────────────────────────────────────────────────

app.use((req, res) => {
  res.status(404).json({ error: `Route ${req.method} ${req.path} not found` });
});

// ── Error handler ─────────────────────────────────────────────────────────────

app.use((err, req, res, next) => {
  console.error("[Server Error]", err);
  res.status(500).json({ error: "Internal server error" });
});

// ── Start ─────────────────────────────────────────────────────────────────────

app.listen(PORT, () => {
  console.log(`✓ Applid API running on http://localhost:${PORT}`);
});
