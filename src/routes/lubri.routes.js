import { Router } from "express"

import { SendSalesOfTheDay } from "../controller/lubri.controller.js"

const LubriRouter = Router()

LubriRouter.post('/', SendSalesOfTheDay)

export default LubriRouter
