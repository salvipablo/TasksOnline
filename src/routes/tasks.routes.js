import { Router } from "express"

import {
  ManageTasks,
  ViewTasks,
  CreateTask,
  GetTasks,
  DeleteTask
} from "../controller/tasks.controller.js"


const TasksRouter = Router()

TasksRouter.get('/newTasksPage', ManageTasks)
TasksRouter.get('/', ViewTasks)


// Create.
TasksRouter.post('/', CreateTask)

// Read.
TasksRouter.get('/tasks', GetTasks)

// Update.
// Delete.
TasksRouter.delete('/:id', DeleteTask)

export default TasksRouter
