import { Model } from 'sequelize';

class CouponHistory extends Model {
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
        useDate: {
          type: DataTypes.DATE,
          field: 'use_date',
        },
      },
      {
        sequelize,
        tableName: 'coupon_histories',
        timestamps: false,
      }
    );
  }
  static associate(models) {
    models.CouponHistory.belongsTo(models.User, {
      foreignKey: { name: 'userId', allowNull: false },
    });
    models.CouponHistory.belongsTo(models.Coupon, {
      foreignKey: { name: 'couponId', allowNull: false },
    });
  }
}

export default CouponHistory;
