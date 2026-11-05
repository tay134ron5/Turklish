const { Router } = require('express');
const { getHistory } = require('../controllers/history.controller');

const router = Router();

router.get('/', getHistory);

module.exports = router;
