import couponService from '../service/coupon.js';

const createCoupon = async (req, res) => {
  const { discountRate, quantity, couponStatusId } = req.body;

  await couponService.createCoupon(discountRate, quantity, couponStatusId);
  res.status(201).json({ message: 'CREATE COUPON' });
};

const giveCouponTOuser = async (req, res) => {
  const { couponId, userId } = req.body;
  await couponService.giveCouponTOuser(couponId, userId);
  res.status(201).json({ message: 'GIVE COUPON TO USER' });
};

export default {
  createCoupon,
  giveCouponTOuser,
};
