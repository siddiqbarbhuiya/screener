/**
 * @routes contactRoutes
 * @description Routes for contact form submissions
 */

const express = require('express');
const { submitContact } = require('../controllers/contactController');

const router = express.Router();

router.post('/contact', submitContact);

module.exports = router;
