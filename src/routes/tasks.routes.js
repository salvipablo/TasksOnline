import { Router } from "express";

import {
  ManageTasks
} from "../controller/tasks.controller.js";

const TasksRouter = Router()

TasksRouter.get('/', ManageTasks)

export default TasksRouter
