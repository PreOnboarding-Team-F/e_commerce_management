import { Model, Op } from 'sequelize';

export const ORSER_STATUS = {
  CANCEL: '결제 취소',
  COMPLITE: '결제 완료',
  SEND: '발송 처리',
};

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
