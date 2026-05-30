import express from "express";
import cors from "cors";
import "dotenv/config";

import submissionsRouter from "./routes/submissions.js";
import answersRouter from "./routes/answers.js";

const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors({
  origin: [
    process.env.CLIENT_URL || "http://localhost:3000",
   
    /^chrome-extension:\/\//,
  ],
  credentials: true,
}));

app.use(express.json());



app.get("/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

app.use("/submissions", submissionsRouter);
app.use("/answers", answersRouter);



app.use((req, res) => {
  res.status(404).json({ error: `Route ${req.method} ${req.path} not found` });
});



app.use((err, req, res, next) => {
  console.error("[Server Error]", err);
  res.status(500).json({ error: "Internal server error" });
});


app.listen(PORT, () => {
  console.log(` Applid running on http://localhost:${PORT}`);
});
