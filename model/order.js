import { Model, Op, Sequelize } from 'sequelize';

class Order extends Model {
  static init(sequelize, DataTypes) {
    super.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
          unique: true,
        },
        orderDate: {
          type: DataTypes.DATEONLY,
          allowNull: false,
          field: 'order_date',
        },
        quantity: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        price: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        city: {
          type: DataTypes.STRING(40),
        },
        buyrZipx: {
          type: DataTypes.STRING(40),
          allowNull: false,
          field: 'buyr_zipx',
        },
        deliveryNum: {
          type: DataTypes.STRING(100),
          unique: true,
          field: 'delivery_num',
        },
      },
      {
        sequelize,
        tableName: 'orders',
        timestamps: false,
      }
    );
  }
  static associate(models) {
    models.Order.belongsTo(models.OrderStatus, {
      foreignKey: {
        name: 'orderStatusId',
        allowNull: false,
        field: 'order_status_id',
      },
    });
    models.Order.belongsTo(models.Country, {
      foreignKey: {
        name: 'countryId',
        allowNull: false,
        field: 'country_id',
      },
    });
    models.Order.belongsTo(models.User, {
      foreignKey: {
        name: 'userId',
        allowNull: false,
        field: 'user_id',
      },
    });
    models.Order.belongsTo(models.DeliveryStatus, {
      foreignKey: {
        name: 'deliveryStatusId',
        field: 'delivery_status_id',
      },
    });
  }
  static async updateOrderStatus(id, orderStatusId) {
    return await Order.update(
      { orderStatusId },
      {
        where: {
          id,
        },
      }
    );
  }
  static async updateDeliveryNum(id, deliveryNum) {
    await Order.update(
      { deliveryNum },
      {
        where: {
          id,
        },
      }
    );
  }
  static async getOrders(search, orderStatus, user) {
    let where = {
      [Op.and]: {},
    };
    if (search?.name) {
      where[Op.and]['$User.name$'] = search.name;
    }
    if (search?.orderStatusId) {
      where[Op.and].orderStatusId = search.orderStatusId.id;
    }
    if (search?.startDate) {
      where[Op.and]['order_date'] = {
        [Op.between]: [search.startDate, search.endDate],
      };
    }
    return await Order.findAll({
      include: [
        { model: orderStatus, attributes: ['type'] },
        { model: user, attributes: ['name', 'email', 'phoneNum'] },
      ],
      where,
      offset: search.page * 10,
      limit: 10,
      raw: true,
      nest: true,
    });
  }

  static async findById(id) {
    return await Order.findOne({ where: { id } });
  }
  static async updateDeliveryStatus(order, deliveryStatus) {
    await order.update({ deliveryStatusId: deliveryStatus.id });
  }
}
export default Order;
