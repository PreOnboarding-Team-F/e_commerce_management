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

  static async findById(id) {
    return await Order.findOne({ where: { id } });
  }
  static async updateDeliveryStatus(id, deliveryStatusId) {
    await Order.update({ deliveryStatusId }, { where: { id } });
  }
}

export default Order;
