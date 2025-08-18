import { Router } from "express"
import { TestEmailFunction } from "../controller/ter.controller.js"

const TerRouter = Router()

TerRouter.post('/testEmail', TestEmailFunction)

export default TerRouter
