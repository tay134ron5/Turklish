const { supportedLanguages } = require('../config');
const translationService = require('../services/translation.service');
const historyService = require('../services/history.service');

const isNonEmptyString = (v) => typeof v === 'string' && v.trim() !== '';

const postTranslate = async (req, res, next) => {
  const { text, sourceLang, targetLang } = req.body || {};

  if (![text, sourceLang, targetLang].every(isNonEmptyString)) {
    return res.status(400).json({
      error: 'text, sourceLang and targetLang are required strings',
    });
  }

  if (!supportedLanguages.includes(sourceLang) || !supportedLanguages.includes(targetLang)) {
    return res.status(400).json({
      error: `Unsupported language. Supported: ${supportedLanguages.join(', ')}`,
    });
  }

  try {
    const translatedText = await translationService.translate(text, sourceLang, targetLang);

    try {
      await historyService.addEntry({
        text,
        translatedText,
        sourceLang,
        targetLang,
        timestamp: new Date().toISOString(),
      });
    } catch (err) {
      // The translation itself succeeded; don't fail the request over history.
      console.error('Failed to save history:', err.message);
    }

    res.status(200).json({ translatedText });
  } catch (err) {
    next(err);
  }
};

module.exports = { postTranslate };
