import { Model } from 'sequelize';

class Country extends Model {
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
        code: {
          type: DataTypes.STRING(10),
          allowNull: false,
          unique: true,
        },
        number: {
          type: DataTypes.STRING(10),
          allowNull: false,
        },
        name: {
          type: DataTypes.STRING(50),
          allowNull: false,
          unique: true,
        },
      },
      {
        sequelize,
        timestamps: false,
        tableName: 'countries',
        timestamps: false,
      }
    );
  }
  static associate(models) {}
}

export default Country;
