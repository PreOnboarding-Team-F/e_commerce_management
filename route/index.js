import deliveryRouter from './delivery.js';
import express from 'express';
const router = express.Router();

router('/', deliveryRouter);
export default router;
