import { Router } from "express"

import {
  CreateTask,
  GetTasks,
  DeleteTask,
  GetTask,
  UpdateTask
} from "../controller/tasks.controller.js"


const TasksRouter = Router()

/* CRUD */

  // Create Task.
  TasksRouter.post('/', CreateTask)

  // Read all tasks.
  TasksRouter.get('/', GetTasks)

  // Update task.
  TasksRouter.put('/', UpdateTask)

  // Delete task.
  TasksRouter.delete('/:id', DeleteTask)

/* CRUD */

// Get Task.
TasksRouter.get('/:id', GetTask)

export default TasksRouter
