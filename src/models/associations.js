import { TasksSchema } from './tasks.model.js'
import { EmailForTaskSchema } from './emailsForTask.model.js'

TasksSchema.hasMany(EmailForTaskSchema, {
  foreignKey: 'task_id',
  sourceKey: 'id'
})

EmailForTaskSchema.belongsTo(TasksSchema, {
  foreignKey: 'task_id',
  targetKey: 'id'
})
