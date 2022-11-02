import orderStatusRepository from '../model/orderStatus.js';
import orderRepository from '../model/order.js';
import userRepository from '../model/user.js';
import { BadRequestException } from '../util/exception/badRequest.exception.js';

async function getOrders(search) {
  if (search?.orderStatus) {
    search.orderStatusId = await orderStatusRepository.getIdByType(
      search.orderStatus
    );
    if (!search.orderStatusId) {
      throw new BadRequestException('주문 상태 값이 잘못되었습니다.');
    }
  }
  if (search.startDate) {
    search.startDate = makeDate(search.startDate);
    search.endDate = makeDate(search.endDate);
  }
  const data = await orderRepository.getOrders(
    search,
    orderStatusRepository,
    userRepository
  );
  return data;
}

function makeDate(date) {
  return new Date(
    Number(date.substr(0, 4)),
    Number(date.substr(4, 2) - 1),
    Number(date.substr(6, 2))
  );
}

export default {
  getOrders,
};
