import { startServer, stopServer } from '../../server.js';

import Country from '../../model/country.js';
import DeliveryStatus from '../../model/deliveryStatus.js';
import Order from '../../model/order.js';
import OrderStatus from '../../model/orderStatus.js';
import User from '../../model/user.js';
import axios from 'axios';
import { faker } from '@faker-js/faker';
import { sequelize } from '../../db/database.js';

describe('delivery APIs', () => {
  let server;
  let request;
  beforeAll(async () => {
    const id = 1;
    server = await startServer();
    request = axios.create({
      baseURL: `http://localhost:${server.address().port}`,
      validateStatus: null,
    });
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
      code: faker.address.countryCode(),
      number: 1,
      name: 'korea',
    });
    await Order.create({
      id,
      orderDate: new Date().getDate(),
      quantity: 1,
      price: faker.commerce.price(),
      city: faker.address.city(),
      buyrZipx: faker.address.zipCode(),
      deliveryNum: faker.random.numeric(),
      orderStatusId: id,
      countryId: id,
      userId: id,
      deliveryStatusId: id,
    });
  });

  afterAll(async () => {
    await sequelize.drop();
    await stopServer(server);
  });

  describe('PATHCH /delivery/status', () => {
    it('returns 200 성공했을 때', async () => {
      const body = { orderId: 1, deliveryStatus: '배송완료' };

      const response = await request.patch('/delivery/status', body);
      expect(response.status).toBe(200);
      expect(response.data.message).toBe('UPDATE SUCCESS');
    });
    it('returns 400 DB에 orderId가 없는 경우', async () => {
      const body = { orderId: 2, deliveryStatus: '배송완료' };

      const response = await request.patch('/delivery/status', body);
      expect(response.status).toBe(400);
      expect(response.data.message).toBe('유효하지 않은 값입니다.');
    });
    it('returns 400 유효하지 않은 status인 경우', async () => {
      const body = { orderId: 2, deliveryStatus: '배송완료' };

      const response = await request.patch('/delivery/status', body);
      expect(response.status).toBe(400);
      expect(response.data.message).toBe('유효하지 않은 값입니다.');
    });
  });
});
