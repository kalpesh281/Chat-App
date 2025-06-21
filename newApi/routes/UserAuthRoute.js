import express from "express";
import { Login, Register, Logout, CheckCreds } from "../controllers/UserAuthController.js";
import { authMiddleware } from "../middlewares/AuthMiddleware.js";


const router = express.Router();

router.post("/register", Register);
router.post("/login", Login);
router.post("/logout",authMiddleware, Logout);
router.post("/check-creds",authMiddleware,CheckCreds)


export default router;
