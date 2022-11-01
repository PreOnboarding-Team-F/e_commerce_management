import ordersService from '../service/order.js';
import { BadRequestException } from '../util/exception/badRequest.exception.js';

async function getOrders(req, res) {
  const name = req.query?.name;
  const startDate = req.query?.startdate;
  const endDate = req.query?.enddate;
  const orderStatus = req.query.orderstatus;
  if (!startDate ^ !endDate || startDate.length !== 8 || endDate.length !== 8) {
    throw new BadRequestException('주문날짜 시작과 끝을 모두 보내주세요');
  }
  const data = await ordersService.getOrders({
    name,
    startDate,
    endDate,
    orderStatus,
  });
  res.status(200).send({ data });
}

export default {
  getOrders,
};
