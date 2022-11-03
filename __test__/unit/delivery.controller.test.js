import * as deliveryController from '../../controller/delivery.js';
import * as deliveryService from '../../service/delivery.js';

import httpMocks from 'node-mocks-http';

jest.mock('../../service/delivery.js');
describe('order controller delivery status update', () => {
  it('return 200 성공했을 때', async () => {
    const orderId = 1;
    const deliveryStatus = 1;
    const request = httpMocks.createRequest({
      url: '/order/delivery-status',
      method: 'PATCH',
      body: {
        orderId,
        deliveryStatus,
      },
    });
    const response = httpMocks.createResponse();
    deliveryService.updateDeliveryStatus = jest.fn();

    await deliveryController.updateDeliveryStatus(request, response);

    expect(deliveryService.updateDeliveryStatus).toBeCalledTimes(1);
    expect(response.statusCode).toBe(200);
    expect(response._getJSONData().message).toBe('UPDATE SUCCESS');
  });
});
