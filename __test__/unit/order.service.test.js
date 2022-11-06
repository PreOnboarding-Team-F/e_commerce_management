import orderService from '../../service/order.js';
import OrderRepository from '../../model/order.js';
import OrderStatusRepository from '../../model/orderStatus.js';
import { ORDER_STATUS } from '../../model/orderStatus.js';
import UserRespository from '../../model/user.js';
import {
  BadRequestException,
  NotFoundException,
} from '../../util/exception/index.js';

jest.mock('../../model/order.js');

describe('servie - 주문 목록 조회', () => {
  it('성공했을 때 - parameter가 없는 경우', async () => {
    OrderRepository.getOrders = jest.fn();

    await orderService.getOrders({ page: 0 });

    expect(OrderRepository.getOrders).toHaveBeenCalledTimes(1);
    expect(OrderRepository.getOrders).toHaveBeenCalledWith(
      { page: 0 },
      OrderStatusRepository,
      UserRespository
    );
  });

  it('성공했을 때 - 주문자명 검색', async () => {
    OrderRepository.getOrders = jest.fn();

    await orderService.getOrders({ name: 'test1', page: 0 });

    expect(OrderRepository.getOrders).toHaveBeenCalledTimes(1);
    expect(OrderRepository.getOrders).toHaveBeenCalledWith(
      { name: 'test1', page: 0 },
      OrderStatusRepository,
      UserRespository
    );
  });

  it('성공했을 때 - 주문상태 검색', async () => {
    OrderRepository.getOrders = jest.fn();
    OrderStatusRepository.getIdByType = jest.fn(e => 1);

    await orderService.getOrders({
      orderStatus: ORDER_STATUS.CANCEL,
      page: 0,
    });

    expect(OrderStatusRepository.getIdByType).toHaveBeenCalledTimes(1);
    expect(OrderStatusRepository.getIdByType).toHaveBeenCalledWith(
      ORDER_STATUS.CANCEL
    );
    expect(OrderRepository.getOrders).toHaveBeenCalledTimes(1);
    expect(OrderRepository.getOrders).toHaveBeenCalledWith(
      { orderStatus: ORDER_STATUS.CANCEL, orderStatusId: 1, page: 0 },
      OrderStatusRepository,
      UserRespository
    );
  });

  it('성공했을 때 - 주문날짜 검색', async () => {
    const data = {
      startDate: '20220101',
      endDate: '20221103',
      page: 0,
    };
    OrderRepository.getOrders = jest.fn();

    await orderService.getOrders(data);

    data.startDate = new Date(
      Number(data.startDate.toString().substring(0, 3)),
      Number(data.startDate.toString().substring(4, 5) - 1),
      Number(data.startDate.toString().substring(6, 7))
    );
    data.endDate = new Date(
      Number(data.endDate.toString().substring(0, 3)),
      Number(data.endDate.toString().substring(4, 5) - 1),
      Number(data.endDate.toString().substring(6, 7))
    );
    expect(OrderRepository.getOrders).toHaveBeenCalledTimes(1);
    expect(OrderRepository.getOrders).toHaveBeenCalledWith(
      {
        startDate: data.startDate,
        endDate: data.endDate,
        page: 0,
      },
      OrderStatusRepository,
      UserRespository
    );
  });

  it('성공했을 때 - 주문자명,주문상태 검색', async () => {
    OrderRepository.getOrders = jest.fn();
    OrderStatusRepository.getIdByType = jest.fn(e => 1);

    await orderService.getOrders({
      name: 'test1',
      orderStatus: 'cancel',
      page: 0,
    });

    expect(OrderStatusRepository.getIdByType).toHaveBeenCalledTimes(1);
    expect(OrderStatusRepository.getIdByType).toHaveBeenCalledWith(
      ORDER_STATUS.CANCEL
    );
    expect(OrderRepository.getOrders).toHaveBeenCalledTimes(1);
    expect(OrderRepository.getOrders).toHaveBeenCalledWith(
      {
        orderStatus: ORDER_STATUS.CANCEL,
        orderStatusId: 1,
        name: 'test1',
        page: 0,
      },
      OrderStatusRepository,
      UserRespository
    );
  });

  it('성공했을 때 - 주문자명,주문날짜 검색', async () => {
    OrderRepository.getOrders = jest.fn();
    const data = {
      name: 'test1',
      startDate: '20220101',
      endDate: '20221103',
      page: 0,
    };

    await orderService.getOrders(data);

    data.startDate = new Date(
      Number(data.startDate.toString().substring(0, 3)),
      Number(data.startDate.toString().substring(4, 5) - 1),
      Number(data.startDate.toString().substring(6, 7))
    );
    data.endDate = new Date(
      Number(data.endDate.toString().substring(0, 3)),
      Number(data.endDate.toString().substring(4, 5) - 1),
      Number(data.endDate.toString().substring(6, 7))
    );

    expect(OrderRepository.getOrders).toHaveBeenCalledTimes(1);
    expect(OrderRepository.getOrders).toHaveBeenCalledWith(
      {
        startDate: data.startDate,
        endDate: data.endDate,
        name: 'test1',
        page: 0,
      },
      OrderStatusRepository,
      UserRespository
    );
  });

  it('성공했을 때 - 주문상태,주문날짜 검색', async () => {
    OrderRepository.getOrders = jest.fn();
    OrderStatusRepository.getIdByType = jest.fn(e => 1);
    const data = {
      orderStatus: ORDER_STATUS.CANCEL,
      startDate: '20220101',
      endDate: '20221103',
      page: 0,
    };

    await orderService.getOrders(data);

    data.startDate = new Date(
      Number(data.startDate.toString().substring(0, 3)),
      Number(data.startDate.toString().substring(4, 5) - 1),
      Number(data.startDate.toString().substring(6, 7))
    );
    data.endDate = new Date(
      Number(data.endDate.toString().substring(0, 3)),
      Number(data.endDate.toString().substring(4, 5) - 1),
      Number(data.endDate.toString().substring(6, 7))
    );

    expect(OrderStatusRepository.getIdByType).toHaveBeenCalledTimes(1);
    expect(OrderStatusRepository.getIdByType).toHaveBeenCalledWith(
      ORDER_STATUS.CANCEL
    );
    expect(OrderRepository.getOrders).toHaveBeenCalledTimes(1);
    expect(OrderRepository.getOrders).toHaveBeenCalledWith(
      {
        orderStatusId: 1,
        orderStatus: ORDER_STATUS.CANCEL,
        startDate: data.startDate,
        endDate: data.endDate,
        page: 0,
      },
      OrderStatusRepository,
      UserRespository
    );
  });

  it('성공했을 때 - 주문상태,주문날짜,주문자명 검색', async () => {
    OrderRepository.getOrders = jest.fn();
    OrderStatusRepository.getIdByType = jest.fn(e => 1);
    const data = {
      orderStatus: ORDER_STATUS.CANCEL,
      startDate: '20220101',
      endDate: '20221103',
      name: 'test1',
      page: 0,
    };

    await orderService.getOrders(data);

    data.startDate = new Date(
      Number(data.startDate.toString().substring(0, 3)),
      Number(data.startDate.toString().substring(4, 5) - 1),
      Number(data.startDate.toString().substring(6, 7))
    );
    data.endDate = new Date(
      Number(data.endDate.toString().substring(0, 3)),
      Number(data.endDate.toString().substring(4, 5) - 1),
      Number(data.endDate.toString().substring(6, 7))
    );

    expect(OrderStatusRepository.getIdByType).toHaveBeenCalledTimes(1);
    expect(OrderStatusRepository.getIdByType).toHaveBeenCalledWith(
      ORDER_STATUS.CANCEL
    );
    expect(OrderRepository.getOrders).toHaveBeenCalledTimes(1);
    expect(OrderRepository.getOrders).toHaveBeenCalledWith(
      {
        orderStatusId: 1,
        orderStatus: ORDER_STATUS.CANCEL,
        startDate: data.startDate,
        endDate: data.endDate,
        name: 'test1',
        page: 0,
      },
      OrderStatusRepository,
      UserRespository
    );
  });

  it('실패했을 때 - 주문 상태 값이 이상할 때', async () => {
    OrderStatusRepository.getIdByType = jest.fn(e => null);
    let search = { orderStatus: '실패' };

    expect(async () => {
      await orderService.getOrders(search);
    }).rejects.toThrowError(
      new BadRequestException('주문 상태 값이 잘못되었습니다.')
    );

    expect(OrderStatusRepository.getIdByType).toHaveBeenCalledTimes(1);
    expect(OrderStatusRepository.getIdByType).toHaveBeenCalledWith('실패');
  });
});

describe('service - 주문상태 수정', () => {
  it('성공했을 때 - 결제취소', async () => {
    OrderRepository.findById = jest.fn(e => 1);
    OrderStatusRepository.getIdByType = jest.fn(e => {
      return {
        id: 1,
      };
    });
    OrderRepository.updateOrderStatus = jest.fn(e => [1]);

    await orderService.updateOrderStatus(1, ORDER_STATUS.CANCEL);

    expect(OrderStatusRepository.getIdByType).toHaveBeenCalledTimes(1);
    expect(OrderStatusRepository.getIdByType).toHaveBeenCalledWith(
      ORDER_STATUS.CANCEL
    );
    expect(OrderRepository.findById).toHaveBeenCalledTimes(1);
    expect(OrderRepository.findById).toHaveBeenCalledWith(1);
    expect(OrderRepository.updateOrderStatus).toHaveBeenCalledTimes(1);
    expect(OrderRepository.updateOrderStatus).toHaveBeenCalledWith(1, 1);
  });
  it('성공했을 때 - 결제완료', async () => {
    OrderRepository.findById = jest.fn(e => 1);
    OrderStatusRepository.getIdByType = jest.fn(e => {
      return {
        id: 1,
      };
    });
    OrderRepository.updateOrderStatus = jest.fn(e => [1]);

    await orderService.updateOrderStatus(1, ORDER_STATUS.COMPLITE);

    expect(OrderStatusRepository.getIdByType).toHaveBeenCalledTimes(1);
    expect(OrderStatusRepository.getIdByType).toHaveBeenCalledWith(
      ORDER_STATUS.COMPLITE
    );
    expect(OrderRepository.findById).toHaveBeenCalledTimes(1);
    expect(OrderRepository.findById).toHaveBeenCalledWith(1);
    expect(OrderRepository.updateOrderStatus).toHaveBeenCalledTimes(1);
    expect(OrderRepository.updateOrderStatus).toHaveBeenCalledWith(1, 1);
  });
  it('성공했을 때 - 배송처리', async () => {
    OrderRepository.findById = jest.fn(e => 1);
    OrderStatusRepository.getIdByType = jest.fn(e => {
      return {
        id: 1,
      };
    });
    OrderRepository.updateOrderStatus = jest.fn(e => [1]);
    OrderRepository.updateDeliveryNum = jest.fn();

    await orderService.updateOrderStatus(1, ORDER_STATUS.SEND);

    expect(OrderStatusRepository.getIdByType).toHaveBeenCalledTimes(1);
    expect(OrderStatusRepository.getIdByType).toHaveBeenCalledWith(
      ORDER_STATUS.SEND
    );

    expect(OrderRepository.findById).toHaveBeenCalledTimes(1);
    expect(OrderRepository.findById).toHaveBeenCalledWith(1);
    expect(OrderRepository.updateOrderStatus).toHaveBeenCalledTimes(1);
    expect(OrderRepository.updateOrderStatus).toHaveBeenCalledWith(1, 1);
    expect(OrderRepository.updateDeliveryNum).toHaveBeenCalledTimes(1);
  });

  it('실패했을 때 - 주문상태 값 불량', async () => {
    OrderStatusRepository.getIdByType = jest.fn(e => null);

    expect(async () => {
      await orderService.updateOrderStatus(5, '불량');
    }).rejects.toThrowError(
      new BadRequestException('주문 상태 값이 잘못되었습니다.')
    );

    expect(OrderStatusRepository.getIdByType).toHaveBeenCalledTimes(1);
    expect(OrderStatusRepository.getIdByType).toHaveBeenCalledWith('불량');
  });

  it('실패했을 때 - 주문번호 값 불량', async () => {
    OrderStatusRepository.getIdByType = jest.fn(e => {
      return {
        id: 1,
      };
    });
    OrderRepository.findById = jest.fn(e => null);

    expect(async () => {
      await orderService.updateOrderStatus(1, ORDER_STATUS.SEND);
    }).rejects.toThrowError(new NotFoundException('잘못된 요청입니다.'));

    expect(OrderStatusRepository.getIdByType).toHaveBeenCalledTimes(1);
    expect(OrderStatusRepository.getIdByType).toHaveBeenCalledWith(
      ORDER_STATUS.SEND
    );
  });
});
