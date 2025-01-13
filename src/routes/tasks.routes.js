import { Router } from "express"

import {
  ManageTasks,
  ViewTasks,
  CreateTask,
  GetTasks
} from "../controller/tasks.controller.js"


const TasksRouter = Router()

TasksRouter.get('/', ManageTasks)
TasksRouter.get('/viewTasks', ViewTasks)


TasksRouter.post('/', CreateTask)
TasksRouter.get('/tasks', GetTasks)

export default TasksRouter
