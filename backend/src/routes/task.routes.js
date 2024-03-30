import { Router } from "express"
import { createTask, deleteAllTasks, deleteTaskById, getAllTasks } from "../controllers/task.controllers.js"
import { verifyJwt } from "../middlewares/auth.middleware.js"

const router=Router()

router.route('/').post(verifyJwt,createTask)
router.route('/').get(verifyJwt,getAllTasks)
router.route('/').delete(verifyJwt,deleteAllTasks)

router.route('/:taskId').delete(deleteTaskById)


export default router