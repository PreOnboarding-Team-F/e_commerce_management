import orderStatusRepository from '../model/orderStatus.js';
import { ORSER_STATUS } from '../model/orderStatus.js';
import orderRepository from '../model/order.js';
import userRepository from '../model/user.js';
import { BadRequestException } from '../util/exception/badRequest.exception.js';
import { NotFoundException } from '../util/exception/notFound.exception.js';

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

async function updateOrderStatus(id, orderStatus) {
  const orderStatusId = await orderStatusRepository.getIdByType(orderStatus);
  if (!orderStatusId) {
    throw new BadRequestException('주문 상태 값이 잘못되었습니다.');
  }
  const order = await orderRepository.findById(id);
  if (!order) {
    throw new NotFoundException('잘못된 요청입니다.');
  }
  await orderRepository.updateOrderStatus(id, orderStatusId.id);
  if (ORSER_STATUS.SEND === orderStatus) {
    await orderRepository.updateDeliveryNum(id, makeDeliveryNum());
  }
}

function makeDate(date) {
  return new Date(
    Number(date.substr(0, 4)),
    Number(date.substr(4, 2) - 1),
    Number(date.substr(6, 2))
  );
}
function makeDeliveryNum() {
  return Math.ceil(Math.random() * (999999999999 - 100000000) + 100000000);
}

export default {
  getOrders,
  updateOrderStatus,
};
