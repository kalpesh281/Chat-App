import express from "express";
import {
  Login,
  Register,
  Logout,
  CheckCreds,
  SearchUser,
} from "../controllers/UserAuthController.js";
import { authMiddleware } from "../middlewares/AuthMiddleware.js";

const router = express.Router();

router.post("/register", Register);
router.post("/login", Login);
router.post("/logout", authMiddleware, Logout);
router.post("/check-creds", authMiddleware, CheckCreds);
router.get("/search-user", authMiddleware, SearchUser);

export default router;
