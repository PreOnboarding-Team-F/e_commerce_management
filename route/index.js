import couponRouter from './coupon.js';
import deliveryRouter from './delivery.js';
import express from 'express';
import orders from './order.js';
const router = express.Router();

router.use('/orders', orders);

router.use('/coupon', couponRouter);

router.use('/delivery', deliveryRouter);
export default router;
