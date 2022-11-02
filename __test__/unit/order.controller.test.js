import orderController from '../../controller/order.js';
import orderService from '../../service/order.js';
import { BadRequestException } from '../../util/exception/index.js';
import { ORDER_STATUS } from '../../model/orderStatus.js';
import httpMocks from 'node-mocks-http';

jest.mock('../../service/order.js');
describe('contoller - 주문 목록 조회', () => {
  it('성공했을 때', async () => {
    const request = httpMocks.createRequest({
      url: '/orders',
      method: 'GET',
    });
    const response = httpMocks.createResponse();
    orderService.getOrders = jest.fn();

    await orderController.getOrders(request, response);

    expect(orderService.getOrders).toBeCalledTimes(1);
    expect(response.statusCode).toBe(200);
  });

  it('성공했을 때 - 페이지 기능', async () => {
    const orderId = 1;
    const deliveryStatus = 1;
    const request = httpMocks.createRequest({
      url: '/orders?page=1',
      method: 'GET',
      body: {
        orderId,
        deliveryStatus,
      },
    });
    const response = httpMocks.createResponse();
    orderService.getOrders = jest.fn();

    await orderController.getOrders(request, response);

    expect(orderService.getOrders).toBeCalledTimes(1);
    expect(response.statusCode).toBe(200);
  });

  it('성공했을 때 - 유저명 검색', async () => {
    const orderId = 1;
    const deliveryStatus = 1;
    const request = httpMocks.createRequest({
      url: '/orders?name=test1',
      method: 'GET',
      body: {
        orderId,
        deliveryStatus,
      },
    });
    const response = httpMocks.createResponse();
    orderService.getOrders = jest.fn();

    await orderController.getOrders(request, response);

    expect(orderService.getOrders).toBeCalledTimes(1);
    expect(response.statusCode).toBe(200);
  });

  it('성공했을 때 - 주문상태 검색', async () => {
    const orderId = 1;
    const deliveryStatus = 1;
    const request = httpMocks.createRequest({
      url: '/orders?orderstatus = cancel',
      method: 'GET',
      body: {
        orderId,
        deliveryStatus,
      },
    });
    const response = httpMocks.createResponse();
    orderService.getOrders = jest.fn();

    await orderController.getOrders(request, response);

    expect(orderService.getOrders).toBeCalledTimes(1);
    expect(response.statusCode).toBe(200);
  });

  it('성공했을 때 - 주문날짜 검색', async () => {
    const orderId = 1;
    const deliveryStatus = 1;
    const request = httpMocks.createRequest({
      url: '/orders?startdate = 20220101&enddate = 20221102',
      method: 'GET',
      body: {
        orderId,
        deliveryStatus,
      },
    });
    const response = httpMocks.createResponse();
    orderService.getOrders = jest.fn();

    await orderController.getOrders(request, response);

    expect(orderService.getOrders).toBeCalledTimes(1);
    expect(response.statusCode).toBe(200);
  });

  it('실패했을 때 - 시작날짜만 보내는 경우', async () => {
    const request = httpMocks.createRequest({
      url: '/orders?startdate=20221101',
      method: 'GET',
    });
    const response = httpMocks.createResponse();
    orderService.getOrders = jest.fn();

    expect(
      async () => await orderController.getOrders(request, response)
    ).rejects.toThrowError(
      new BadRequestException('주문날짜 시작과 끝을 모두 보내주세요')
    );
  });

  it('실패했을 때 - 끝 날짜만 보내는 경우', async () => {
    const request = httpMocks.createRequest({
      url: '/orders?enddate=20221101',
      method: 'GET',
    });
    const response = httpMocks.createResponse();
    orderService.getOrders = jest.fn();

    expect(
      async () => await orderController.getOrders(request, response)
    ).rejects.toThrowError(
      new BadRequestException('주문날짜 시작과 끝을 모두 보내주세요')
    );
  });
});

describe('contoller - 주문 상태 변경', () => {
  it('성공했을 때', async () => {
    const orderStatus = ORDER_STATUS.CANCEL;
    const request = httpMocks.createRequest({
      url: '/orders/1',
      method: 'PATCH',
      body: {
        orderStatus,
      },
    });

    const response = httpMocks.createResponse();
    orderService.updateOrderStatus = jest.fn();

    await orderController.updateOrderStatus(request, response);

    expect(orderService.updateOrderStatus).toBeCalledTimes(1);
    expect(response.statusCode).toBe(200);
  });
});
