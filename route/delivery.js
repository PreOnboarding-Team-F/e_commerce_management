import * as deliveryController from '../controller/delivery.js';

import { DELIEVERY_STATUS } from '../model/deliveryStatus.js';
import { body } from 'express-validator';
import express from 'express';
import validator from '../middleware/validate.js';

const router = express.Router();

const deliveryStatusUpdate = [
  body('deliveryStatus')
    .notEmpty()
    .withMessage('유효하지 않은 값입니다.')
    .trim()
    .custom(value => {
      if (
        value === DELIEVERY_STATUS.START ||
        value === DELIEVERY_STATUS.ING ||
        value === DELIEVERY_STATUS.COMPLITED
      ) {
        return true;
      }
    })
    .withMessage('유효하지 않은 값입니다.'),
  validator,
];

router.patch(
  '/:id/delivery-status',
  deliveryStatusUpdate,
  deliveryController.updateDeliveryStatus
);

export default router;
