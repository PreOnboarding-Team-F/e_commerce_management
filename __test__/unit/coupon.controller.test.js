import couponController from '../../controller/coupon.js';
import couponService from '../../service/coupon.js';
import httpMocks from 'node-mocks-http';
import { fn } from 'sequelize';

jest.mock('../../service/coupon.js');

describe('Controller coupon create', () => {
  it('SUCCESS', async () => {
    const discountRate = 1000;
    const quantity = 100;
    const couponStatusId = 1;

    const req = httpMocks.createRequest({
      url: '/coupon/create',
      method: 'POST',
      body: {
        discountRate,
        quantity,
        couponStatusId,
      },
    });
    const res = httpMocks.createResponse();

    couponService.createCoupon = jest.fn();

    await couponController.createCoupon(req, res);

    expect(res.statusCode).toBe(201);
    expect(res._getJSONData().message).toBe('CREATE COUPON');
  });
});

describe('Controller giveCouponToUser', () => {
  it('SUCCESS', async () => {
    const couponId = 1;
    const userId = 1;

    const req = httpMocks.createRequest({
      url: '/coupon/',
      method: 'POST',
      body: {
        couponId,
        userId,
      },
    });
    const res = httpMocks.createResponse();

    couponService.giveCouponToUser = jest.fn();

    await couponController.giveCouponToUser(req, res);

    expect(res.statusCode).toBe(201);
    expect(res._getJSONData().message).toBe('GIVE COUPON TO USER');
  });
});

describe('Controller useCoupon', () => {
  it('SUCCESS', async () => {
    const couponId = 1;
    const userId = 1;
    const countryId = 12;
    const price = 100000;
    const quantity = 100;
    const city = 'SW';
    const buyrZipx = 12345;

    const req = httpMocks.createRequest({
      url: '/coupon/',
      method: 'PATCH',
      body: {
        couponId,
        userId,
        countryId,
        price,
        quantity,
        city,
        buyrZipx,
      },
    });

    const res = httpMocks.createResponse();
    couponService.useCoupon = jest.fn();
    await couponController.useCoupon(req, res);

    expect(res.statusCode).toBe(200);
    expect(res._getJSONData().message).toBe('USE COUPON');
  });
});
