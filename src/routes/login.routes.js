import { Router } from "express"
import { Login } from "../controller/login.controller.js"

const LoginRouter = Router()

LoginRouter.post('/', Login)

export default LoginRouter