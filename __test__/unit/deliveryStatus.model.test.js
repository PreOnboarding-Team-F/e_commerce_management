import DeliveryStatus from '../../model/deliveryStatus.js';

describe('delivery status model findByType', () => {
  it('성공 했을 때', async () => {
    const type = '';
    const deliveryStatus = {
      id: 1,
      type,
    };
    DeliveryStatus.findOne = jest.fn(() => deliveryStatus);

    const result = await DeliveryStatus.findByType(type);

    expect(DeliveryStatus.findOne).toBeCalledTimes(1);
    expect(DeliveryStatus.findOne).toBeCalledWith({ where: { type } });
    expect(result).toBe(deliveryStatus);
  });
});
