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
        },
        deliveryNum: {
          type: DataTypes.STRING(100),
          unique: true,
        },
      },
      {
        sequelize,
        timestamps: false,
        tableName: 'orders',
        underscored: true,
      }
    );
  }

  static associate(models) {
    models.Order.belongsTo(models.OrderStatus, {
      foreignKey: {
        name: 'orderStatusId',
        allowNull: false,
      },
    });
    models.Order.belongsTo(models.Country, {
      foreignKey: {
        name: 'countryId',
        allowNull: false,
      },
    });
    models.Order.belongsTo(models.User, {
      foreignKey: {
        name: 'userId',
        allowNull: false,
      },
    });
    models.Order.belongsTo(models.DeliveryStatus, {
      foreignKey: {
        name: 'deliveryStatusId',
      },
    });
  }
  static async updateOrderStatus(id, orderStatusId) {
    return await Order.update(
      { orderStatusId: orderStatusId },
      {
        where: {
          id: id,
        },
      }
    );
  }
  static async updateDeliveryNum(id, deliveryNum) {
    await Order.update(
      { deliveryNum: deliveryNum },
      {
        where: {
          id: id,
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
  static createOrder = async (
    today,
    quantity,
    totalPrice,
    city,
    buyrZipx,
    countryId,
    userId
  ) => {
    return await Order.create({
      orderDate: today,
      orderStatusId: 1,
      quantity,
      price: totalPrice,
      city,
      buyr_zipx: buyrZipx,
      countryId,
      userId,
    });
  };
  static async findById(id) {
    return await Order.findOne({ where: { id } });
  }
  static async updateDeliveryStatus(id, deliveryStatusId) {
    await Order.update({ deliveryStatusId }, { where: { id } });
  }
}
export default Order;
