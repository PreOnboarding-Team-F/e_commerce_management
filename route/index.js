import express from 'express';
import orders from './order.js';

const router = express.Router();
router.use('/orders', orders);

export default router;
