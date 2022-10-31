import express from 'express';
import couponController from '../controller/coupon.js';
import { body } from 'express-validator';
import { validate } from '../middleware/validate.js';
import { validateCouponType } from '../middleware/couponValidate.js';

const router = express.Router();

const validateCreateCoupon = [
  body('couponStatusId')
    .custom(validateCouponType)
    .withMessage('할인 타입이 유효하지 않습니다.'),
  body('discountRate').notEmpty().withMessage('할인율이 입력되지 않았습니다.'),
  body('quantity').notEmpty().withMessage('수량을 입력해 주세요'),
  validate,
];

router.post('/create', validateCreateCoupon, couponController.createCoupon);

export default router;
