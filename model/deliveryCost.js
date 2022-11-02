import { Model } from 'sequelize';
import { Op } from 'sequelize';

class DeliveryCost extends Model {
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
        quantity: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        price: {
          type: DataTypes.FLOAT,
          allowNull: false,
        },
      },
      {
        sequelize,
        timestamps: false,
        tableName: 'delivery_cost',
        timestamps: false,
      }
    );
  }
  static associate(models) {
    models.DeliveryCost.belongsTo(models.Country, {
      foreignKey: { name: 'countryId', allowNull: false },
    });
  }
  static getCostToDelivery = async (countryId, quantity) => {
    return await DeliveryCost.findOne({
      where: {
        [Op.and]: [{ countryId: countryId }, { quantity: quantity }],
      },
    });
  };
}

export default DeliveryCost;
