import ordersService from '../service/order.js';

async function getOrders(req, res) {
  const name = req.query?.name;
  const startDate = req.query?.startdate;
  const endDate = req.query?.enddate;
  const orderStatus = req.query.orderstatus;
  if (
    !startDate ^ !endDate &&
    startDate.length === 8 &&
    startDate.length === 8
  ) {
    console.log('error');
    // err 넘겨야함 badrequest
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
