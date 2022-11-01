import Order from '../../model/order.js';

describe('order model findById', () => {
  it('성공 했을 때', async () => {
    const id = 1;
    const order = { id };
    Order.findByPk = jest.fn(() => order);

    const result = await Order.findById(id);

    expect(Order.findByPk).toBeCalledTimes(1);
    expect(Order.findByPk).toBeCalledWith(id);
    expect(result).toBe(order);
  });
});

describe('order model delivery status update', () => {
  it('성공 했을 때', async () => {
    const order = { update: jest.fn() };
    const status = {};

    await Order.updateDeliveryStatus(order, status);

    expect(order.update).toBeCalledTimes(1);
    expect(order.update).toBeCalledWith({ deliveryStatus: status });
  });
});
