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
          type: DataTypes.DATE,
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
      foreignKey: 'orderStatusId',
    });
    models.Order.belongsTo(models.Country, {
      foreignKey: 'countryId',
    });
    models.Order.belongsTo(models.User, {
      foreignKey: 'userId',
    });
    models.Order.belongsTo(models.DeliveryStatus, {
      foreignKey: 'deliveryStatusId',
    });
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
    return await this.findAll({
      include: [
        { model: orderStatus, attributes: ['id'] },
        { model: user, attributes: ['name', 'email', 'phoneNum'] },
      ],
      where,
      raw: true,
      nest: true,
    });
  }
}

export default Order;
