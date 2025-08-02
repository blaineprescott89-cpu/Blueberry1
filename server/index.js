import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

// Middleware
app.use(express.json());

// Serve static files from React build
app.use(express.static(resolve(__dirname, '../client/dist'), {
  setHeaders: (res, path) => {
    // Cache busting for main files
    if (path.endsWith('.html')) {
      res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
      res.setHeader('Pragma', 'no-cache');
      res.setHeader('Expires', '0');
    }
  }
}));

// API health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    message: 'Blueberry React app server is running',
    timestamp: new Date().toISOString()
  });
});

// Serve React app for all routes (SPA fallback)
app.get('*', (req, res) => {
  res.sendFile(resolve(__dirname, '../client/dist/index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port, '0.0.0.0', () => {
  console.log(`🫐 Blueberry React app running on port ${port}`);
  console.log(`Serving from: ${resolve(__dirname, '../client/dist')}`);
});