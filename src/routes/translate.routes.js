const { Router } = require('express');
const { postTranslate } = require('../controllers/translate.controller');

const router = Router();

router.post('/', postTranslate);

module.exports = router;
