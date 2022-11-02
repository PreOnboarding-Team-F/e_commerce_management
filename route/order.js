import express from 'express';
import ordersController from '../controller/order.js';
import { ORDER_STATUS } from '../model/orderStatus.js';
import { body, query } from 'express-validator';
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

const getorders = [
  query('startdate')
    .optional()
    .isLength({ min: 8, max: 8 })
    .withMessage('시작 날짜는 총 8개입니다.'),
  query('enddate')
    .optional()
    .isLength({ min: 8, max: 8 })
    .withMessage('마지막 날짜는 총 8개입니다.'),
  validator,
];

router.get('', getorders, ordersController.getOrders);
router.patch('/:id', orderStatusUpdate, ordersController.updateOrderStatus);

export default router;
