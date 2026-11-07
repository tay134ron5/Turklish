const path = require('path');
const express = require('express');
const config = require('./config');
const healthRoutes = require('./routes/health.routes');
const translateRoutes = require('./routes/translate.routes');
const historyRoutes = require('./routes/history.routes');

const app = express();

// Google Identity Services popups need to postMessage back to this page.
// "same-origin" would sever that link; "same-origin-allow-popups" keeps isolation but allows our popups.
app.use((_req, res, next) => {
  res.setHeader('Cross-Origin-Opener-Policy', 'same-origin-allow-popups');
  next();
});

app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'public')));

// Routes
app.use('/api/health', healthRoutes);
app.use('/api/translate', translateRoutes);
app.use('/api/history', historyRoutes);

// 404 fallback
app.use((_req, res) => {
  res.status(404).json({ error: 'Not Found' });
});

// Error handler (e.g. malformed JSON body -> 400 instead of an HTML error page)
app.use((err, _req, res, _next) => {
  const status = err.status || 500;
  res.status(status).json({ error: status === 500 ? 'Internal Server Error' : err.message });
});

app.listen(config.port, () => {
  console.log(`${config.appName} API running on http://localhost:${config.port}`);
});
