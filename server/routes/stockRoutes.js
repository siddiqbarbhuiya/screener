const router = require('express').Router();
const search = require('../controllers/searchController');
const company = require('../controllers/companyController');
const chart = require('../controllers/chartController');
const financials = require('../controllers/financialsController');
const screen = require('../controllers/screenController');

router.get('/search', search.search);
router.get('/company/:symbol', company.getCompany);
router.get('/company/:symbol/chart', chart.getChart);
router.get('/company/:symbol/financials', financials.getFinancials);
router.get('/company/:symbol/shareholding', financials.getShareholding);
router.post('/screen', screen.runScreen);

module.exports = router;
