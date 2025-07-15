import {Router} from 'express'
import { login, logout, register } from '../controllers/user.controller.js'
import auth from '../middleware/auth.middleware.js'

const router = Router()

router.route("/register").post(register)
router.route("/login").post(login)
router.route("/logout").post(auth ,logout)


export default router 