import express from 'express'
import { loginUser, registerUser, logout } from '../controllers/auth Controllers.js';
const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").get(logout);


export default router;