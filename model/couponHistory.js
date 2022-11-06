import { Model } from 'sequelize';
import { Op } from 'sequelize';

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
        discountCost: {
          type: DataTypes.INTEGER,
          allowNull: false,
          field: 'discount_cost',
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
  static giveCouponToUser = async (userId, couponId) => {
    return await CouponHistory.create({
      userId,
      couponId,
    });
  };
  static userCouponInfo = async (userId, couponId) => {
    return await CouponHistory.findOne({
      where: {
        [Op.and]: [{ userId: userId }, { couponId: couponId }],
      },
    });
  };
  static isExistCouponToUser = async userId => {
    return await CouponHistory.findOne({
      where: { userId: userId },
    });
  };
  static useTodayAndDiscountCost = async (
    userId,
    couponId,
    today,
    totalDiscount
  ) => {
    await CouponHistory.update(
      {
        useDate: today,
        discountCost: totalDiscount,
      },
      {
        where: { [Op.and]: [{ userId: userId }, { couponId: couponId }] },
      }
    );
  };
  static async getCouponHistory() {
    return await CouponHistory.findAll({
      attributes: ['id', 'userId', 'couponId'],
      where: { useDate: null },
    });
  }
}

export default CouponHistory;
