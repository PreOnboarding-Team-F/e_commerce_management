import express from 'express';
import ordersController from '../controller/order.js';
import { ORDER_STATUS } from '../model/orderStatus.js';
import { body } from 'express-validator';
import validator from '../middleware/validate.js';

const router = express.Router();

const orderStatusUpdate = [
  body('orderStatus')
    .notEmpty()
    .withMessage('유효하지 않은 값입니다.')
    .trim()
    .custom(value => {
      if (
        value === ORDER_STATUS.CANCEL ||
        value === ORDER_STATUS.COMPLITE ||
        value === ORDER_STATUS.SEND
      ) {
        return true;
      }
    })
    .withMessage('유효하지 않은 값입니다.'),
  validator,
];

router.get('', ordersController.getOrders);
router.patch('/:id', orderStatusUpdate, ordersController.updateOrderStatus);

export default router;
