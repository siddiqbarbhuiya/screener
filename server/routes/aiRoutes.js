const express = require('express');
const router = express.Router();
const multer = require('multer');
const ai = require('../controllers/aiController');
const documentAnalyzer = require('../controllers/documentAnalyzerController');

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 30 * 1024 * 1024 },
});

router.get('/company-summary/:symbol', ai.companySummary);
router.get('/stock-reason/:symbol', ai.stockReason);
router.get('/red-flags/:symbol', ai.redFlags);
router.post('/screener', ai.nlScreener);
router.post('/document-analyze', upload.single('pdf'), documentAnalyzer.analyzeDocument);

module.exports = router;
