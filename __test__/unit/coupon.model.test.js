import Coupon from '../../model/coupon.js';
import { Op } from 'sequelize';
import CouponHistory from '../../model/couponHistory.js';

describe('Coupon getCouponId', () => {
  it('SUCCESS', async () => {
    const id = 1;
    const couponStatusId = 1;
    const discountRate = 1000;
    const coupon = { id, discountRate, couponStatusId };
    Coupon.findOne = jest.fn(() => coupon);

    const result = await Coupon.getCouponId(couponStatusId, discountRate);

    expect(Coupon.findOne).toBeCalledWith({
      where: {
        [Op.and]: [
          { couponStatusId: couponStatusId },
          { discountRate: discountRate },
        ],
      },
    });
    expect(result).toBe(coupon);
  });
});

describe('Coupon getCouponInfo', () => {
  it('SUCCESS', async () => {
    const id = 1;
    const coupon = { id };
    Coupon.findOne = jest.fn(() => coupon);

    const result = await Coupon.getCouponInfo(id);

    expect(Coupon.findOne).toBeCalledWith({
      where: { id },
    });
    expect(result).toBe(coupon);
  });
});

describe('Coupon history userCouponInfo', () => {
  it('SUCCESS', async () => {
    const id = 1;
    const userId = 1;
    const couponId = 1;
    const couponHistory = { id, userId, couponId };
    CouponHistory.findOne = jest.fn(() => couponHistory);

    const result = await CouponHistory.userCouponInfo(id, userId, couponId);

    expect(CouponHistory.findOne).toBeCalledWith({
      where: {
        [Op.and]: [{ userId: userId }, { couponId: couponId }],
      },
    });
    expect(result).toBe(couponHistory);
  });
});
