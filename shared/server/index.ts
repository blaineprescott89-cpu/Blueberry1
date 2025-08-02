import express from "express";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import ViteExpress from "vite-express";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = parseInt(process.env.PORT!) || 5000;

app.use(express.json());

// Health check endpoint for Railway
app.get("/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// API routes
app.get("/api/test", (req, res) => {
  res.json({ message: "API is working!" });
});

// Serve static files in production
if (process.env.NODE_ENV === "production") {
  const staticPath = join(__dirname, "../dist/public");
  app.use(express.static(staticPath));
  
  app.get("*", (req, res) => {
    res.sendFile(join(staticPath, "index.html"));
  });
  
  app.listen(port, "0.0.0.0", () => {
    console.log(`Server running on port ${port}`);
  });
} else {
  ViteExpress.listen(app, port, () => {
    console.log(`Server running on port ${port}`);
  });
}
