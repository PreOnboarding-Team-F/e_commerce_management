import Order from '../../model/order.js';

describe('order model findById', () => {
  it('성공 했을 때', async () => {
    const id = 1;
    const order = { id };
    Order.findOne = jest.fn(() => order);

    const result = await Order.findById(id);

    expect(Order.findOne).toBeCalledTimes(1);
    expect(Order.findOne).toBeCalledWith({ where: { id } });
    expect(result).toBe(order);
  });
});

describe('order model delivery status update', () => {
  it('성공 했을 때', async () => {
    const order = { update: jest.fn() };
    const deliveryStatus = {};

    await Order.updateDeliveryStatus(order, deliveryStatus);

    expect(order.update).toBeCalledTimes(1);
    expect(order.update).toBeCalledWith({
      deliveryStatusId: deliveryStatus.id,
    });
  });
});
