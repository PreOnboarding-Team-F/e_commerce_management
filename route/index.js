import deliveryRouter from './delivery.js';
import express from 'express';
import orders from './order.js';
const router = express.Router();
import couponRouter from './coupon.js';

router.use('/orders', orders);

router.use('/coupon', couponRouter);

router.use('', deliveryRouter);
export default router;
