import express from 'express';
import couponController from '../controller/coupon.js';
import { validateCreateCoupon } from '../middleware/couponValidate.js';
import coupon from '../service/coupon.js';

const router = express.Router();

router.post('/create', validateCreateCoupon, couponController.createCoupon);
router.post('', couponController.giveCouponToUser);
router.patch('', couponController.useCoupon);
router.get('', couponController.getCouponHistory);
router.get('/discount', couponController.couponTypeDiscount);

export default router;
