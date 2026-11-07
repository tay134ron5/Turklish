const googleTranslate = require('google-translate-api-x');

// Our public codes → provider codes, where they differ. The provider has no plain "zh".
const providerCodes = { zh: 'zh-CN' };
const toProvider = (lang) => providerCodes[lang] || lang;

// Free Google Translate (no API key). Upstream failures surface as 502.
const translate = async (text, from, to) => {
  try {
    const { text: translated } = await googleTranslate(text, { from: toProvider(from), to: toProvider(to) });
    return translated;
  } catch (err) {
    throw Object.assign(new Error(`Translation provider failed: ${err.message}`), { status: 502 });
  }
};

module.exports = { translate };
