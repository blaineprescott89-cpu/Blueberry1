import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
app.use(express.json());

// Serve static files from dist with cache control
app.use(express.static(resolve(__dirname, '../dist'), {
  setHeaders: (res, path) => {
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
  }
}));

// API health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Blueberry server is running' });
});

// Direct route for signup page to bypass caching
app.get('/signup', (req, res) => {
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');
  res.setHeader('X-Timestamp', Date.now().toString());
  
  // Force browser cache refresh with unique content
  const timestamp = new Date().toISOString();
  res.send(`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>🫐 Sign Up - Blueberry (${timestamp})</title>
    <meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate">
    <meta http-equiv="Pragma" content="no-cache">
    <meta http-equiv="Expires" content="0">
</head>
<body>
    <div style="padding: 40px; text-align: center; font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #333; margin-bottom: 20px;">🫐 Sign Up for Blueberry</h1>
        <div style="background: #d4edda; border: 1px solid #c3e6cb; padding: 15px; border-radius: 8px; margin: 20px 0; color: #155724;">
            <strong>✅ SUCCESS!</strong> Your custom domain signup page is working!<br>
            <strong>Domain:</strong> myblueberry.io<br>
            <strong>Time:</strong> ${timestamp}<br>
            <strong>Cache Status:</strong> Bypassed
        </div>
        
        <p style="color: #666; margin-bottom: 30px;">Create your account to start tracking law school applications</p>
        
        <div style="max-width: 400px; margin: 0 auto; background: #f8f9fa; padding: 20px; border-radius: 8px;">
            <input type="email" placeholder="Email Address" style="width: 100%; padding: 12px; margin: 10px 0; border-radius: 5px; border: 1px solid #ccc; box-sizing: border-box;" />
            <input type="password" placeholder="Password" style="width: 100%; padding: 12px; margin: 10px 0; border-radius: 5px; border: 1px solid #ccc; box-sizing: border-box;" />
            <button onclick="alert('🎉 Signup functionality will be implemented next! This proves the page is working.')" 
                style="width: 100%; padding: 12px; margin: 10px 0; background: #007bff; color: white; border: none; border-radius: 5px; cursor: pointer; font-size: 16px; font-weight: bold;">
                Create Account
            </button>
        </div>
        
        <p style="margin-top: 30px;">
            <a href="/" style="color: #007bff; text-decoration: none; font-weight: bold;">← Back to Home</a>
        </p>
    </div>

    <script>
        console.log('✅ Blueberry signup page loaded successfully!');
        console.log('Timestamp: ${timestamp}');
        console.log('Domain: myblueberry.io');
        
        // Show visual confirmation
        setTimeout(() => {
            const banner = document.createElement('div');
            banner.style.cssText = 'position:fixed;top:0;left:0;right:0;background:#28a745;color:white;text-align:center;padding:10px;z-index:9999;font-weight:bold;';
            banner.textContent = '✅ myblueberry.io/signup is working! Cache cleared at ${timestamp}';
            document.body.appendChild(banner);
            setTimeout(() => banner.remove(), 5000);
        }, 500);
    </script>
</body>
</html>`);
});

// Direct route for login page to bypass caching
app.get('/login', (req, res) => {
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');
  
  const timestamp = new Date().toISOString();
  res.send(`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>🫐 Login - Blueberry Law School Tracker</title>
    <meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate">
    <meta http-equiv="Pragma" content="no-cache">
    <meta http-equiv="Expires" content="0">
</head>
<body>
    <div style="padding: 40px; text-align: center; font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #333; margin-bottom: 20px;">🫐 Login to Blueberry</h1>
        <p style="color: #666; margin-bottom: 30px;">Access your law school application dashboard</p>
        
        <div style="max-width: 400px; margin: 0 auto; background: #f8f9fa; padding: 20px; border-radius: 8px;">
            <input type="email" placeholder="Email Address" style="width: 100%; padding: 12px; margin: 10px 0; border-radius: 5px; border: 1px solid #ccc; box-sizing: border-box;" />
            <input type="password" placeholder="Password" style="width: 100%; padding: 12px; margin: 10px 0; border-radius: 5px; border: 1px solid #ccc; box-sizing: border-box;" />
            <button onclick="alert('🎉 Login functionality will be implemented next! Page is working perfectly.')" 
                style="width: 100%; padding: 12px; margin: 10px 0; background: #28a745; color: white; border: none; border-radius: 5px; cursor: pointer; font-size: 16px; font-weight: bold;">
                Sign In
            </button>
        </div>
        
        <p style="margin-top: 30px;">
            <a href="/" style="color: #007bff; text-decoration: none; font-weight: bold;">← Back to Home</a>
        </p>
        
        <div style="background: #d1ecf1; border: 1px solid #bee5eb; padding: 10px; border-radius: 5px; margin: 20px 0; color: #0c5460; font-size: 14px;">
            Login page working at ${timestamp}
        </div>
    </div>
</body>
</html>`);
});

// Direct route for home page
app.get('/', (req, res) => {
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');
  
  const timestamp = new Date().toISOString();
  res.send(`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>🫐 Blueberry - Law School Application Tracker</title>
    <meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate">
    <meta http-equiv="Pragma" content="no-cache">
    <meta http-equiv="Expires" content="0">
</head>
<body>
    <div style="padding: 40px; text-align: center; font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto;">
        <h1 style="color: #333; margin-bottom: 10px; font-size: 3em;">🫐 Blueberry</h1>
        <h2 style="color: #555; margin-bottom: 20px; font-weight: 300;">Law School Application Tracker</h2>
        <p style="color: #666; margin-bottom: 40px; font-size: 1.2em;">Your comprehensive platform for law school applications</p>
        
        <div style="background: #f8f9fa; border: 1px solid #e9ecef; padding: 20px; border-radius: 8px; margin: 30px 0;">
            <h3 style="color: #495057; margin-bottom: 15px;">Track Your Law School Journey</h3>
            <p style="color: #6c757d; margin-bottom: 0;">Manage applications, deadlines, and requirements all in one place</p>
        </div>
        
        <div style="margin: 40px 0;">
            <a href="/signup" style="display: inline-block; background: #007bff; color: white; padding: 15px 30px; border: none; border-radius: 5px; margin: 0 15px; cursor: pointer; font-size: 18px; text-decoration: none; font-weight: bold;">
                Sign Up
            </a>
            <a href="/login" style="display: inline-block; background: #28a745; color: white; padding: 15px 30px; border: none; border-radius: 5px; margin: 0 15px; cursor: pointer; font-size: 18px; text-decoration: none; font-weight: bold;">
                Login
            </a>
        </div>
        
        <div style="background: #e8f4fd; border: 1px solid #b8daff; padding: 15px; border-radius: 8px; margin: 30px 0; color: #004085;">
            <strong>🎉 Welcome to Blueberry!</strong><br>
            Your law school application tracker is live at myblueberry.io<br>
            <small>Last updated: ${timestamp}</small>
        </div>
    </div>

    <script>
        console.log('🫐 Blueberry home page loaded successfully!');
        console.log('Domain: myblueberry.io');
        console.log('Timestamp: ${timestamp}');
    </script>
</body>
</html>`);
});

// Serve the single HTML app for all other routes
app.get('*', (req, res) => {
  res.sendFile(resolve(__dirname, '../dist/app.html'));
});

const port = process.env.PORT || 5000;
app.listen(port, '0.0.0.0', () => {
  console.log(`Server running on port ${port}`);
});// Updated Sat Aug  2 04:28:14 PM UTC 2025
