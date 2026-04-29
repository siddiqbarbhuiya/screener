const express = require('express');
const router = express.Router();
const ai = require('../controllers/aiController');

router.get('/company-summary/:symbol', ai.companySummary);
router.get('/stock-reason/:symbol', ai.stockReason);
router.get('/red-flags/:symbol', ai.redFlags);
router.post('/screener', ai.nlScreener);

module.exports = router;
