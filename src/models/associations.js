import { TasksSchema } from './tasks.model.js'
import { EmailForTaskSchema } from './emailsForTask.model.js'
import { UserSchema } from './users.model.js'

// Relación Users -> Tasks (Un usuario puede tener muchas tareas)
UserSchema.hasMany(TasksSchema, {
  foreignKey: 'user_id',
  sourceKey: 'id'
})

TasksSchema.belongsTo(UserSchema, {
  foreignKey: 'user_id',
  targetKey: 'id'
})


// Relación Tasks -> EmailsForTask (Una tarea puede tener muchos emails)
TasksSchema.hasMany(EmailForTaskSchema, {
  foreignKey: 'task_id',
  sourceKey: 'id'
})

EmailForTaskSchema.belongsTo(TasksSchema, {
  foreignKey: 'task_id',
  targetKey: 'id'
})