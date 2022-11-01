import { Model } from 'sequelize';

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

  static async findById(id) {
    return await Order.findOne({ where: { id } });
  }
  static async updateDeliveryStatus(order, deliveryStatus) {
    await order.update({ deliveryStatusId: deliveryStatus.id });
  }
}

export default Order;
