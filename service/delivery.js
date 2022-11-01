import { BadRequestException } from '../util/exception/index.js';
import DeliveryStatus from '../model/deliveryStatus.js';
import Order from '../model/order.js';
export const updateDeliveryStatus = async (orderId, deliveryStatus) => {
  const isExistedOrder = await Order.findById(orderId);
  if (!isExistedOrder) {
    throw new BadRequestException('유효하지 않은 값입니다.');
  }
  const isExistedDeliveryStatus = await DeliveryStatus.findByType(
    deliveryStatus
  );
  if (!isExistedDeliveryStatus) {
    throw new BadRequestException('유효하지 않은 값입니다.');
  }
  Order.updateDeliveryStatus(deliveryStatus);
};
