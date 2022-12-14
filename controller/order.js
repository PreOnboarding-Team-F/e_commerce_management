import ordersService from '../service/order.js';
import { BadRequestException } from '../util/exception/badRequest.exception.js';

async function getOrders(req, res) {
  const name = req.query?.name;
  const startDate = req.query?.startdate;
  const endDate = req.query?.enddate;
  const orderStatus = req.query.orderstatus;
  const page = req.query?.page ? req.query.page : 0;
  if (!startDate ^ !endDate) {
    throw new BadRequestException('주문날짜 시작과 끝을 모두 보내주세요');
  }
  const data = await ordersService.getOrders({
    name,
    startDate,
    endDate,
    orderStatus,
    page,
  });
  res.status(200).send({ data });
}

async function updateOrderStatus(req, res) {
  const id = req.params.id;
  const { orderStatus } = req.body;
  await ordersService.updateOrderStatus(id, orderStatus);
  res.status(200).send({ message: 'UPDATE SUCCESS' });
}

export default {
  getOrders,
  updateOrderStatus,
};
