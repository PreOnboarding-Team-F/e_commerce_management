import * as deliveryController from '../controller/delivery.js';

import express from 'express';
const router = express.Router();

router.patch('/delivery', deliveryController.updateDeliveryStatus);

export default router;
