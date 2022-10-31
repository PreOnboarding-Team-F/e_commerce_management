import couponService from '../service/coupon.js';

const createCoupon = async (req, res) => {
  const { discountRate, quantity, couponStatusId } = req.body;

  await couponService.createCoupon(discountRate, quantity, couponStatusId);
  res.status(201).json({ message: 'CREATE COUPON' });
};

export default {
  createCoupon,
};
