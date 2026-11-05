const googleTranslate = require('google-translate-api-x');

// Free Google Translate (no API key). Upstream failures surface as 502.
const translate = async (text, from, to) => {
  try {
    const { text: translated } = await googleTranslate(text, { from, to });
    return translated;
  } catch (err) {
    throw Object.assign(new Error(`Translation provider failed: ${err.message}`), { status: 502 });
  }
};

module.exports = { translate };
