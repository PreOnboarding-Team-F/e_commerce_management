import orderService from '../../service/order.js';
import {
  BadRequestException,
  NotFoundException,
} from '../../util/exception/index.js';
import { sequelize, Coupon } from '../../db/database.js';
import { ORSER_STATUS } from '../../model/orderStatus.js';

afterAll(async () => {
  await sequelize.close();
});

describe('servie - 주문 목록 조회', () => {
  it('성공했을 때 - parameter가 없는 경우', async () => {
    const result = await orderService.getOrders();
    expect(result).not.toEqual([]);
  });

  it('성공했을 때 - 주문자명 검색', async () => {
    const result = await orderService.getOrders({ name: 'test1' });
    expect(result).not.toEqual([]);
  });

  it('성공했을 때 - 주문상태 검색', async () => {
    const result = await orderService.getOrders({ orderStatus: 'cancel' });
    expect(result).not.toEqual([]);
  });

  it('성공했을 때 - 주문날짜 검색', async () => {
    const result = await orderService.getOrders({
      startDate: '20220101',
      endDate: '20221103',
    });
    expect(result).not.toEqual([]);
  });

  it('성공했을 때 - 주문자명,주문상태 검색', async () => {
    const result = await orderService.getOrders({
      name: 'test1',
      orderStatus: 'cancel',
    });
    expect(result).not.toEqual([]);
  });

  it('성공했을 때 - 주문자명,주문날짜 검색', async () => {
    const result = await orderService.getOrders({
      name: 'test1',
      startDate: '20220101',
      endDate: '20221103',
    });
    expect(result).not.toEqual([]);
  });

  it('성공했을 때 - 주문상태,주문날짜 검색', async () => {
    const result = await orderService.getOrders({
      orderStatus: 'cancel',
      startDate: '20220101',
      endDate: '20221103',
    });
    expect(result).not.toEqual([]);
  });

  it('성공했을 때 - 주문상태,주문날짜,주문자명 검색', async () => {
    const result = await orderService.getOrders({
      orderStatus: 'cancel',
      startDate: '20220101',
      endDate: '20221103',
      name: 'test1',
    });
    expect(result).not.toEqual([]);
  });

  it('실패했을 때 - 주문 상태 값이 이상할 때', async () => {
    let search = { orderStatus: 'qwe' };
    expect(async () => {
      await orderService.getOrders(search);
    }).rejects.toThrowError(
      new BadRequestException('주문 상태 값이 잘못되었습니다.')
    );
  });
});

describe('service - 주문상태 수정', () => {
  it('실패했을 때 - 주문상태 값 불량', async () => {
    expect(async () => {
      await orderService.updateOrderStatus(5, '불량');
    }).rejects.toThrowError(
      new BadRequestException('주문 상태 값이 잘못되었습니다.')
    );
  });

  it('실패했을 때 - 주문번호 값 불량', async () => {
    expect(async () => {
      await orderService.updateOrderStatus(2, ORSER_STATUS.SEND);
    }).rejects.toThrowError(new NotFoundException('잘못된 요청입니다.'));
  });

  it('성공했을 때 - 결제완료', async () => {
    const result = await orderService.updateOrderStatus(
      5,
      ORSER_STATUS.COMPLITE
    );
    expect(result).not.toEqual([]);
  });
  it('성공했을 때 - 결제취소', async () => {
    const result = await orderService.updateOrderStatus(5, ORSER_STATUS.CANCEL);
    expect(result).not.toEqual([]);
  });
  it('성공했을 때 - 배송처리', async () => {
    const result = await orderService.updateOrderStatus(5, ORSER_STATUS.SEND);
    expect(result).not.toEqual([]);
  });
});
