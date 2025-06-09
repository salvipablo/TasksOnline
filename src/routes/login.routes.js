import { Router } from "express"
import { Login } from "../controller/auth.controller.js"

const LoginRouter = Router()

LoginRouter.post('/', Login)

export default LoginRouter
