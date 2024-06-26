import { Router } from "express";
import { registerUser,loginUser, logoutUser, changeCurrentPassword } from "../controllers/user.controllers.js";
import { verifyJwt } from "../middlewares/auth.middleware.js";

const router=Router()

router.route('/register').post(registerUser)
router.route('/login').post(loginUser)
router.route('/logout').post(verifyJwt,logoutUser)
router.route('/change-current-password').post(changeCurrentPassword)

export default router;