import express from "express";
const router = express.Router();

import * as HomeController from '../controllers/homeController.js';

router.get('/', HomeController.index);
router.get('/404', HomeController.errorPage);

export default router;