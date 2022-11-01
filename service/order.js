import orderStatusRepository from '../model/orderStatus.js';
import orderRepository from '../model/order.js';
import userRepository from '../model/user.js';

async function getOrders(search) {
  if (search?.orderStatus) {
    search.orderStatusId = await orderStatusRepository.getIdByType(
      search.orderStatus
    );
    if (!search.orderStatusId) {
      // err 넘겨야함 badrequest
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
