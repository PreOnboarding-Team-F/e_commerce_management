import { Model } from 'sequelize';

class Coupon extends Model {
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
        discountRate: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        code: {
          type: DataTypes.STRING(50),
          allowNull: false,
        },
        quantity: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        useNum: {
          type: DataTypes.INTEGER,
          default: 0,
          allowNull: false,
          field: 'use_num',
        },
        totalDiscountPrice: {
          type: DataTypes.INTEGER,
          default: 0,
          allowNull: false,
        },
      },
      {
        sequelize,
        tableName: 'coupons',
        timestamps: false,
      }
    );
  }
  static associate(models) {
    models.Coupon.belongsTo(models.CouponStatus, {
      foreignKey: {
        name: 'couponStatusId',
        allowNull: false,
      },
    });
  }
}

export default Coupon;
