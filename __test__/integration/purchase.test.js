import { startServer, stopServer } from '../../server.js';

import Country from '../../model/country.js';
import Coupon from '../../model/coupon.js';
import CouponStatus from '../../model/couponStatus.js';
import DeliveryCost from '../../model/deliveryCost.js';
import DeliveryStatus from '../../model/deliveryStatus.js';
import OrderStatus from '../../model/orderStatus.js';
import User from '../../model/user.js';
import axios from 'axios';
import { faker } from '@faker-js/faker';
import { sequelize } from '../../db/database.js';

describe('purchase APIs', () => {
  let server;
  let request;
  let id;
  beforeAll(async () => {
    server = await startServer();
    request = axios.create({
      baseURL: `http://localhost:${server.address().port}`,
      validateStatus: null,
    });
    id = 1;
    await User.create({
      id,
      name: faker.name.fullName(),
      email: faker.internet.email(),
      phoneNum: faker.phone.number(),
    });
    await OrderStatus.create({
      id,
      type: '결제완료',
    });
    await DeliveryStatus.create({
      id,
      type: '배송완료',
    });
    await Country.create({
      id,
      code: 'KR',
      number: 82,
      name: 'korea',
    });
    await Country.create({
      id: 2,
      code: 'US',
      number: 1,
      name: 'korea',
    });
    await DeliveryCost.create({
      id,
      quantity: 2,
      price: 2500,
      countryId: id,
    });
    await DeliveryCost.create({
      id: 2,
      quantity: 2,
      price: 3000,
      countryId: 2,
    });
    await CouponStatus.create({
      id,
      type: '%할인',
    });
    await Coupon.create({
      id,
      discountRate: 10,
      code: faker.random.numeric(),
      quantity: 10,
      useNum: 9,
      totalDiscountPrice: 9000,
      couponStatusId: id,
    });
  });
  afterAll(async () => {
    await sequelize.drop();
    await stopServer(server);
  });
  // %할인을 예시로 테스트 코드 작성
  describe('POST /orders', () => {
    it('returns 200 10% 할인 쿠폰 사용 및 한국에서 구매', async () => {
      const body = {
        couponId: id,
        countryCode: 'KR',
        quantity: 2,
        price: 20000,
      };
      const expectResult = {
        discountPrice: (body.totalPrice * 10) / 100,
        deliveryPrice: 2500,
        totalPrice: (body.totalPrice * 90) / 100 + 2500,
      };

      const response = await request.post('/orders', body);

      expect(response.status).toBe(200);
      expect(response.data).toEqual(expectResult);
    });
    it('returns 200 %할인 쿠폰 사용 및 한국이 아닌 국가의 구매', async () => {
      const exchangeRate = 1200;
      const body = {
        couponId: id,
        countryCode: 'US',
        quantity: 2,
        price: 10,
      };
      const expectResult = {
        discountPrice: (body.totalPrice * 10) / 100,
        deliveryPrice: 3000 / exchangeRate,
        totalPrice: (body.totalPrice * 90) / 100 + 3000 / exchangeRate,
      };

      const response = await request.post('/orders', body);

      expect(response.status).toBe(200);
      expect(response.data).toBe(expectResult);
    });
    it('returns 200 쿠폰 없을 때', async () => {
      const body = {
        countryCode: 'US',
        quantity: 1,
        totalPrice: 10,
      };
      const expectResult = {
        discountPrice: '',
        deliveryPrice: 3000 / exchangeRate,
        totalPrice: (body.totalPrice * 90) / 100 + 3000 / exchangeRate,
      };

      const response = await request.post('/orders', body);

      expect(response.status).toBe(200);
      expect(response.data.message).toBe(expectResult);
    });
    it('return 400 국가 코드가 유효하지 않을 때', async () => {
      const body = {
        couponId: id,
        countryCode: '',
        quantity: 1,
        totalPrice: 10,
      };

      const response = await request.post('/orders', body);

      expect(response.status).toBe(400);
      expect(response.data.message).toBe('유효하지 않은 값입니다.');
    });
    it('return 400 쿠폰 id가 유효하지 않을 때', async () => {
      const body = {
        couponId: 'not',
        countryCode: 'US',
        quantity: 1,
        totalPrice: 10,
      };

      const response = await request.post('/orders', body);

      expect(response.status).toBe(400);
      expect(response.data.message).toBe('유효하지 않은 값입니다.');
    });
    it('return 400 이미 사용한 쿠폰일 때', async () => {
      const body = {
        couponId: id,
        countryCode: 'US',
        quantity: 1,
        totalPrice: 10,
      };

      const response = await request.post('/orders', body);

      expect(response.status).toBe(400);
      expect(response.data.message).toBe('이미 사용된 쿠폰입니다.');
    });
  });
});
