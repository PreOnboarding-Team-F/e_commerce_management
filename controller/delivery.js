import * as deliveryService from '../service/delivery.js';

export const updateDeliveryStatus = async (req, res) => {
  const { orderId, deliveryStatus } = req.body.orderId;
  deliveryService.updateDeliveryStatus(orderId, deliveryStatus);

  res.status(200).json({ message: 'UPDATE SUCCESS' });
};
