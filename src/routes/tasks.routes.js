import { Router } from "express"

import {
  CreateTask,
  GetTasks,
  DeleteTask
} from "../controller/tasks.controller.js"


const TasksRouter = Router()

// Create.
TasksRouter.post('/', CreateTask)

// Read.
TasksRouter.get('/', GetTasks)

// Update.

// Delete.
TasksRouter.delete('/:id', DeleteTask)

export default TasksRouter
