import { Router } from "express";

import {
  ManageTasks,
  ViewTasks
} from "../controller/tasks.controller.js";

const TasksRouter = Router()

TasksRouter.get('/', ManageTasks)
TasksRouter.get('/viewTasks', ViewTasks)

export default TasksRouter
