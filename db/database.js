import { DataTypes, Sequelize } from 'sequelize';

import Country from '../model/country.js';
import Coupon from '../model/coupon.js';
import CouponHistory from '../model/couponHistory.js';
import CouponStatus from '../model/couponStatus.js';
import DeliveryCost from '../model/deliveryCost.js';
import DeliveryStatus from '../model/deliveryStatus.js';
import Order from '../model/order.js';
import OrderStatus from '../model/orderStatus.js';
import User from '../model/user.js';
import config from '../config.js';

const { host, username, database, password, dialect } = config.development;
const db = {};
export const sequelize = new Sequelize(database, username, password, {
  host,
  dialect,
});

db.sequelize = sequelize;

db.Country = Country;
db.Coupon = Coupon;
db.CouponStatus = CouponStatus;
db.CouponHistory = CouponHistory;
db.User = User;
db.Order = Order;
db.OrderStatus = OrderStatus;
db.DeliveryStatus = DeliveryStatus;
db.DeliveryCost = DeliveryCost;

Country.init(sequelize, DataTypes);
Coupon.init(sequelize, DataTypes);
CouponStatus.init(sequelize, DataTypes);
CouponHistory.init(sequelize, DataTypes);
User.init(sequelize, DataTypes);
Order.init(sequelize, DataTypes);
OrderStatus.init(sequelize, DataTypes);
DeliveryStatus.init(sequelize, DataTypes);
DeliveryCost.init(sequelize, DataTypes);

//Country.associations(db);
Coupon.associate(db);
CouponStatus.associate(db);
CouponHistory.associate(db);
User.associate(db);
Order.associate(db);
OrderStatus.associate(db);
DeliveryStatus.associate(db);
DeliveryCost.associate(db);
