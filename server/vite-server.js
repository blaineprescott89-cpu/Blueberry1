import express from 'express';
import { createServer as createViteServer } from 'vite';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function createServer() {
  const app = express();

  // Create Vite server in middleware mode
  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: 'spa',
    root: resolve(__dirname, '../client'),
  });

  // Use vite's connect instance as middleware
  app.use(vite.ssrFixStacktrace);
  app.use(vite.middlewares);

  // Serve the client app for all routes
  app.use('*', async (req, res, next) => {
    const url = req.originalUrl;

    try {
      // 1. Read index.html
      let template = await vite.transformIndexHtml(url, `
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Blueberry - Law School Application Tracker</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
      `);

      // 5. Send the rendered HTML back.
      res.status(200).set({ 'Content-Type': 'text/html' }).end(template);
    } catch (e) {
      // If an error is caught, let Vite fix the stack trace so it maps back to
      // your actual source code.
      vite.ssrFixStacktrace(e);
      next(e);
    }
  });

  const port = process.env.PORT || 5000;
  app.listen(port, '0.0.0.0', () => {
    console.log(`🫐 Blueberry development server running on http://localhost:${port}`);
  });
}

createServer();