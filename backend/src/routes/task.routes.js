import { Router } from "express"
import { createTask } from "../controllers/task.controllers.js"
import { verifyJwt } from "../middlewares/auth.middleware.js"

const router=Router()

router.route('/create-task').post(verifyJwt,createTask)

export default router