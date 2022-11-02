import deliveryRouter from './delivery.js';
import express from 'express';
import orders from './order.js';
const router = express.Router();
router.use('/orders', orders);

router.use('/orders', deliveryRouter);
export default router;
