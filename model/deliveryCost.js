import { Model } from 'sequelize';

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
        tableName: 'delivery_cost',
        timestamps: false,
      }
    );
  }
  static associate(models) {
    models.DeliveryCost.belongsTo(models.Country, {
      foreignKey: 'countryId',
    });
  }
}

export default DeliveryCost;
