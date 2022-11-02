import {
  BadRequestException,
  NotFoundException,
} from '../../util/exception/index.js';
import couponService from '../../service/coupon.js';
import Coupon from '../../model/coupon.js';
import CouponHistory from '../../model/couponHistory.js';

jest.mock('../../model/coupon.js');
jest.mock('../../model/couponHistory.js');

describe('Service couponCreate', () => {
  const quantity = 100;
  const discountRate = 100;

  it('Failed: 배송비 할인 쿠폰 할인율 범위를 벗어날 경우', () => {
    const couponStatusId = 1;
    expect(async () => {
      await couponService.createCoupon(discountRate, quantity, couponStatusId);
    }).rejects.toThrowError(BadRequestException);
  });
  it('Failed: % 할인 쿠폰 할인율 범위를 벗어날 경우', () => {
    const couponStatusId = 2;
    expect(async () => {
      await couponService.createCoupon(discountRate, quantity, couponStatusId);
    }).rejects.toThrowError(BadRequestException);
  });
  it('Failed: 정액 할인 쿠폰 할인율 범위를 벗어날 경우', () => {
    const couponStatusId = 3;
    expect(async () => {
      await couponService.createCoupon(discountRate, quantity, couponStatusId);
    }).rejects.toThrowError(BadRequestException);
  });

  it('Failed: 해당 쿠폰이 존재하는 경우', () => {
    const id = 1;
    const couponStatusId = 1;
    const quantity = 100;
    const discountRate = 1000;
    const coupon = {
      id,
      quantity,
      couponStatusId,
      discountRate,
    };
    Coupon.getCouponId = jest.fn(() => coupon);

    expect(async () => {
      await couponService.createCoupon(discountRate, quantity, couponStatusId);
    }).rejects.toThrowError(NotFoundException);
  });

  it('SUCCESS', async () => {
    const couponStatusId = 1;
    const quantity = 100;
    const discountRate = 1000;

    Coupon.getCouponId = jest.fn();

    await couponService.createCoupon(discountRate, quantity, couponStatusId);

    expect(Coupon.createCoupon).toBeTruthy();
  });
});

describe('Service giveCouponToUser', () => {
  it('Fail: 발급 하려는 쿠폰이 없는 경우', () => {
    const couponId = 1;
    const userId = 1;
    Coupon.getCouponInfo = jest.fn();

    expect(async () => {
      await couponService.giveCouponToUser(couponId, userId);
    }).rejects.toThrowError(NotFoundException);
  });
});

describe('Service useCoupon', () => {
  it('Fail: 유저가 쿠폰을 가지고 있지 않을 경우', () => {
    const couponId = 1;
    const userId = 1;
    CouponHistory.userCouponInfo = jest.fn();

    expect(async () => {
      await couponService.useCoupon(couponId, userId);
    }).rejects.toThrowError(NotFoundException);
  });
});
