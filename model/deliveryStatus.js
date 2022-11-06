import { Model } from 'sequelize';

export const DELIEVERY_STATUS = {
  ING: '배송중',
  COMPLITED: '배송완료',
};
class DeliveryStatus extends Model {
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
        tableName: 'delivery_status',
        underscored: true,
        timestamps: false,
      }
    );
  }
  static associate(models) {}
  static async findByType(type) {
    return await DeliveryStatus.findOne({ where: { type } });
  }
}

export default DeliveryStatus;
