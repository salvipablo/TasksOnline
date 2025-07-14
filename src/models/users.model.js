import { DataTypes } from "sequelize"

import { sequelize } from "../database/database.js"

export const UserSchema = sequelize.define('users', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  username: {
    type: DataTypes.STRING
  },
  password: {
    type: DataTypes.STRING
  },
  emails: {
    type: DataTypes.STRING
  }
}, {
  timestamps: false
})
