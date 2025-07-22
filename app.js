import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import handler from "./api/predict.js"; // Import the handler

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());

// Serve index.html
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// Use the same handler for local /api/predict
app.post("/api/predict", handler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
