/**
 * @routes contactRoutes
 * @description Routes for contact form submissions
 */

import { Router } from 'express';
import { submitContact } from '../controllers/contactController.js';

const router = Router();

router.post('/contact', submitContact);

export default router;
