import Order from '../../model/order.js';

describe('order model findById', () => {
  it('return 200 성공 했을 때', async () => {
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
  it('return 200 성공 했을 때', async () => {
    const id = 1;
    const deliveryStatusId = 1;

    Order.update = jest.fn();
    await Order.updateDeliveryStatus(id, deliveryStatusId);

    expect(Order.update).toBeCalledTimes(1);
    expect(Order.update).toBeCalledWith(
      { deliveryStatusId },
      { where: { id } }
    );
  });
});
