import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
app.use(express.json());

// Serve static files from dist
app.use(express.static(resolve(__dirname, '../dist')));

// API health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Blueberry server is running' });
});

// React app fallback - serve index.html for all non-API routes
app.get('*', (req, res) => {
  // Don't interfere with API routes
  if (req.path.startsWith('/api')) {
    return res.status(404).json({ error: 'API route not found' });
  }
  
  res.sendFile(resolve(__dirname, '../dist/index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port, '0.0.0.0', () => {
  console.log(`Server running on port ${port}`);
});