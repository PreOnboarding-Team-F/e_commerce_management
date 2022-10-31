import * as orderService from '../../service/delivery.js';

import { BadRequestException } from '../../util/exception/index.js';
import DeliveryStatus from '../../model/deliveryStatus.js';
import Order from '../../model/order.js';

jest.mock('../../model/order.js');
jest.mock('../../model/deliveryStatus.js');

describe('order service delivery status update', () => {
  it('db에 order id가 없는 경우', () => {
    const orderId = 1;
    const deliveryStatus = 1;
    Order.findById = jest.fn();

    expect(async () => {
      await orderService.updateDeliveryStatus(orderId, deliveryStatus);
    }).rejects.toThrowError(BadRequestException);
  });

  it('deliveryStatus가 유효하지 않을 때', () => {
    const orderId = 1;
    const deliveryStatus = 1;
    Order.findById = jest.fn(() => 1);
    DeliveryStatus.findByType = jest.fn();

    expect(async () => {
      await orderService.updateDeliveryStatus(orderId, deliveryStatus);
    }).rejects.toThrowError(BadRequestException);
  });

  it('성공 시', async () => {
    const orderId = 1;
    const deliveryStatus = 1;
    Order.findById = jest.fn(() => 1);
    DeliveryStatus.findByType = jest.fn(() => 1);
    Order.updateDeliveryStatus = jest.fn();

    await orderService.updateDeliveryStatus(orderId, deliveryStatus);

    expect(Order.updateDeliveryStatus).toBeCalledTimes(1);
  });
});
