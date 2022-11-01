import { Model } from 'sequelize';

class User extends Model {
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
        name: {
          type: DataTypes.STRING(20),
          allowNull: false,
        },
        email: {
          type: DataTypes.STRING(50),
          allowNull: false,
          unique: true,
        },
        phoneNum: {
          type: DataTypes.STRING(30),
          allowNull: false,
          unique: true,
          field: 'phone_num',
        },
      },
      {
        sequelize,
        tableName: 'users',
        timestamps: false,
      }
    );
  }
  static associate(models) {}
}

export default User;
