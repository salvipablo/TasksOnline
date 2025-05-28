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

  /* -- Update task. -- */

    // Get Task.
    TasksRouter.get('/:id', GetTask) // Ejecucion.

    // Update Task.
    TasksRouter.put('/', UpdateTask)

  /* -- Update task. -- */

  // Delete task.
  TasksRouter.delete('/:id', DeleteTask)

/* CRUD */


export default TasksRouter
