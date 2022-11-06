import { Model } from 'sequelize';
import { Op } from 'sequelize';

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
  static async getCouponId(couponStatusId, discountRate) {
    const result = await Coupon.findOne({
      where: {
        [Op.and]: [
          { couponStatusId: couponStatusId },
          { discountRate: discountRate },
        ],
      },
    });
    return result;
  }
  static async createCoupon(discountRate, code, quantity, couponStatusId) {
    return await Coupon.create({
      discountRate,
      code: code,
      quantity,
      useNum: 0,
      totalDiscountPrice: 0,
      couponStatusId,
    });
  }
  static async getCouponInfo(couponId) {
    return await Coupon.findOne({
      where: {
        id: couponId,
      },
    });
  }
  static async updateCouponQuantity(
    couponId,
    resultCouponQuantity,
    resultCouponUseNum,
    resultCouponDiscountPrice
  ) {
    await Coupon.update(
      {
        quantity: resultCouponQuantity,
        useNum: resultCouponUseNum,
        totalDiscountPrice: resultCouponDiscountPrice,
      },
      {
        where: { id: couponId },
      }
    );
  }
  static async couponTypeDiscount() {
    return await Coupon.findAll({
      attributes: [
        'id',
        'discountRate',
        'couponStatusId',
        'useNum',
        'totalDiscountPrice',
      ],
    });
  }
}

export default Coupon;
