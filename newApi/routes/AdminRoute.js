import express from "express";
import { adminMiddleware } from "../middlewares/AdminMiddleware.js";
import { allUsers } from "../controllers/AdminController.js";


const router = express.Router();

router.get("/allUsers", adminMiddleware, allUsers);



export default router;
