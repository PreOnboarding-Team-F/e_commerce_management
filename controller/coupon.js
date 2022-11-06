import couponService from '../service/coupon.js';

const createCoupon = async (req, res) => {
  const { discountRate, quantity, couponStatusId } = req.body;
  await couponService.createCoupon(discountRate, quantity, couponStatusId);
  res.status(201).json({ message: 'CREATE COUPON' });
};

const giveCouponToUser = async (req, res) => {
  const { couponId, userId } = req.body;
  await couponService.giveCouponToUser(couponId, userId);
  res.status(201).json({ message: 'GIVE COUPON TO USER' });
};

const useCoupon = async (req, res) => {
  const { couponId, userId, countryId, price, quantity, city, buyrZipx } =
    req.body;
  await couponService.useCoupon(
    couponId,
    userId,
    countryId,
    price,
    quantity,
    city,
    buyrZipx
  );
  res.status(200).json({ message: 'USE COUPON' });
};

const getCouponHistory = async (req, res) => {
  const data = await couponService.getCouponHistory();
  res.status(200).json(data);
};

const couponTypeDiscount = async (req, res) => {
  const data = await couponService.couponTypeDiscount();
  res.status(200).json(data);
};

export default {
  createCoupon,
  giveCouponToUser,
  useCoupon,
  getCouponHistory,
  couponTypeDiscount,
};
