import express from 'express';
import ordersController from '../controller/order.js';

const router = express.Router();

router.get('', ordersController.getOrders);
router.patch('/:id', ordersController.updateOrderStatus);

export default router;
