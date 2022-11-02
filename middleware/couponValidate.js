import { body } from 'express-validator';
import { validate } from '../middleware/validate.js';

const validateCouponType = value => {
  if (value === 1 || value === 2 || value === 3) {
    return true;
  }
};

export const validateCreateCoupon = [
  body('couponStatusId')
    .custom(validateCouponType)
    .withMessage('할인 타입이 유효하지 않습니다.'),
  body('discountRate').notEmpty().withMessage('할인율이 입력되지 않았습니다.'),
  body('quantity').notEmpty().withMessage('수량을 입력해 주세요'),
  validate,
];

// export const validateCouponDiscountRate = () => {
//   if (couponStatusId === 1) {
//     if (discountRate >= 1000 && discountRate <= 10000) return true;
//   }

//   if (couponStatusId === 2) {
//     if (discountRate >= 1 && discountRate <= 10) return true;
//   }

//   if (couponStatusId === 3) {
//     if (discountRate >= 10000 && discountRate <= 100000) return true;
//   }
// };
