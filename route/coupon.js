import express from 'express';
import couponController from '../controller/coupon.js';
import { validateCreateCoupon } from '../middleware/couponValidate.js';

const router = express.Router();

router.post('/create', validateCreateCoupon, couponController.createCoupon);
router.post('', couponController.giveCouponToUser);
router.patch('', couponController.useCoupon);

export default router;
