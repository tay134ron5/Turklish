const config = require('../config');

const getHealth = (req, res) => {
  res.status(200).json({
    app: config.appName,
    status: 'running',
    supported_languages: config.supportedLanguages,
  });
};

module.exports = { getHealth };
