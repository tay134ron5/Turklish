const path = require('path');

module.exports = {
  appName: 'Turklish',
  port: process.env.PORT || 3000,
  supportedLanguages: ['en', 'tr', 'ru', 'de', 'es', 'fr', 'ar', 'mk'],
  historyFile: path.join(__dirname, '..', '..', 'data', 'history.json'),
};
