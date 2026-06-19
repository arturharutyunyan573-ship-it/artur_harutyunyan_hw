import { DataTypes, Model } from 'sequelize';

import db from '../clients/db.sequelize.js'

class Users extends Model {
  static async createDefaults() {
  }
}

Users.init({
  id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    // allowNull: false,
  },
  isAdmin: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  age: {
    type: DataTypes.BIGINT,
  },
  email: {
    type: DataTypes.STRING,
  },
  password: {
    type: DataTypes.STRING,
  },
}, {
  // Other model options go here
  sequelize: db, // We need to pass the connection instance
  modelName: 'users', // We need to choose the model name
  tableName: 'users',
  timestamps: true,
});

export default Users;
