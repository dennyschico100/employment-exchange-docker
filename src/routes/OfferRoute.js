const router = require('express').Router();

const { sendErr, sendRes } = require('../utils/ResponseHandler');
const { log } = require('../utils/logger');

router.get('/', async (req, res) => {
  try {
    return sendRes(res, { message: 'All job offers' });
  } catch (error) {
    throw new Error();
  }
});

router.post('/', async (req, res) => {
  try {
    const jobOffer = req.body;
    log.info(jobOffer);
    return sendRes(res, { message: 'oferta agregada' });
  } catch (error) {
    sendErr(error);
  }
});

module.exports = router;
