import Sequelize, { DataTypes, Model } from 'sequelize';

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        id: {
          primaryKey: true,
          type: DataTypes.UUIDV4,
          defaultValue: require('sequelize').UUIDV4,
        },
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        telephone: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );
  }
}

export default User;
