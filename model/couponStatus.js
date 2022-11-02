import { Model } from 'sequelize';

class CouponStatus extends Model {
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
        timestamps: false,
        tableName: 'coupon_status',
        timestamps: false,
      }
    );
  }
  static associate(models) {}
}

export default CouponStatus;
