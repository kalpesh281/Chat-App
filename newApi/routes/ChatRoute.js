import express from "express";
import { authMiddleware } from "../middlewares/AuthMiddleware.js";
import {
  addMemberToGroup,
  getMyChats,
  myGroups,
  newGroupChat,
} from "../controllers/ChatController.js";

const router = express.Router();

router.post("/newGroup", authMiddleware, newGroupChat);
router.get("/myChats", authMiddleware, getMyChats);
router.get("/myGroups", authMiddleware, myGroups);
router.put("/addMember", authMiddleware, addMemberToGroup);

export default router;
