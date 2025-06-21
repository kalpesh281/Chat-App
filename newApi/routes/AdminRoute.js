import express from "express";
import { adminMiddleware } from "../middlewares/AdminMiddleware.js";
import {
  allGroups,
  allTotalMessages,
  allUsers,
} from "../controllers/AdminController.js";

const router = express.Router();

router.get("/allUsers", adminMiddleware, allUsers);
router.get("/allGroups", adminMiddleware, allGroups);
router.get("/allMessages", adminMiddleware, allTotalMessages);

export default router;
