import { Router } from "express"

import {
  ManageTasks,
  ViewTasks,
  CreateTask,
  GetTasks
} from "../controller/tasks.controller.js"


const TasksRouter = Router()

TasksRouter.get('/newTasksPage', ManageTasks)
TasksRouter.get('/', ViewTasks)


TasksRouter.post('/', CreateTask)
TasksRouter.get('/tasks', GetTasks)

export default TasksRouter
