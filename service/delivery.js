import { BadRequestException } from '../util/exception/index.js';
import DeliveryStatus from '../model/deliveryStatus.js';
import Order from '../model/order.js';

export const updateDeliveryStatus = async (orderId, deliveryStatus) => {
  const order = await Order.findById(orderId);
  if (!order) {
    throw new BadRequestException('유효하지 않은 값입니다.');
  }
  const status = await DeliveryStatus.findByType(deliveryStatus);

  if (!status) {
    throw new BadRequestException('유효하지 않은 값입니다.');
  }
  Order.updateDeliveryStatus(order, status);
};
