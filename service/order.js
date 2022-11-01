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
    search.startDate = makeStartDate(search.startDate);
    search.endDate = makeEndDate(search.endDate);
  }
  const data = await orderRepository.getOrders(
    search,
    orderStatusRepository,
    userRepository
  );
  return data;
}

function makeStartDate(date) {
  return new Date(
    date.substr(0, 4),
    date.substr(4, 2) - 1,
    date.substr(6, 2),
    0,
    0,
    0
  );
}
function makeEndDate(date) {
  return new Date(
    date.substr(0, 4),
    date.substr(4, 2) - 1,
    date.substr(6, 2),
    23,
    59,
    59
  );
}

export default {
  getOrders,
};
