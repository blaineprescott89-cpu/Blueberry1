import express from "express";
import path from "path";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());

// Serve static files from the build directory
const distPath = path.resolve(__dirname, '../dist/public');
app.use(express.static(distPath));

// API health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Blueberry server is running' });
});

// Catch-all handler: send back index.html for any non-API routes
app.get('*', (req, res) => {
  res.sendFile(path.resolve(distPath, 'index.html'));
});

const port = parseInt(process.env.PORT || '5000', 10);

app.listen(port, '0.0.0.0', () => {
  console.log(`Server running on port ${port}`);
});
