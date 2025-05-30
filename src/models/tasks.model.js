import { DataTypes } from "sequelize"

import { sequelize } from "../database/database.js"

export const TasksSchema = sequelize.define('tasks', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  affair: {
    type: DataTypes.STRING
  },
  description: {
    type: DataTypes.STRING
  },
  user_id: {
    type: DataTypes.INTEGER
  },
  notice_date: {
    type: DataTypes.STRING
  },
  emails_sent: {
    type: DataTypes.INTEGER
  },
  time_repeat: {
    type: DataTypes.STRING
  }
}, {
  timestamps: false
})
