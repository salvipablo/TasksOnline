import { DataTypes } from "sequelize"

import { sequelize } from "../database/database.js"

export const EmailForTaskSchema = sequelize.define('emailsForTask', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  task_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'tasks',
      key: 'id'
    }
  },
  mail: {
    type: DataTypes.STRING
  }}, {
  timestamps: false
})
