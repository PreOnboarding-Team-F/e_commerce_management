import deliveryRouter from './delivery.js';
import express from 'express';
const router = express.Router();

router.use('/orders', deliveryRouter);
export default router;
