import { Model } from 'sequelize';

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
        timestamps: false,
      }
    );
  }
  static associate(models) {}
}

export default DeliveryStatus;
