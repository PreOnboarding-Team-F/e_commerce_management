import { Model, Op } from 'sequelize';

class OrderStatus extends Model {
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
        type: {
          type: DataTypes.STRING(10),
          allowNull: false,
          unique: true,
        },
      },
      {
        sequelize,
        tableName: 'order_status',
        timestamps: false,
      }
    );
  }
  static associate(models) {}

  static async getIdByType(type) {
    return await this.findOne({
      attributes: ['id'],
      where: { type: { [Op.like]: type } },
      raw: true,
    });
  }
}

export default OrderStatus;
