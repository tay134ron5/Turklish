const historyService = require('../services/history.service');

const getHistory = async (_req, res, next) => {
  try {
    res.status(200).json(await historyService.readHistory());
  } catch (err) {
    next(err);
  }
};

module.exports = { getHistory };
