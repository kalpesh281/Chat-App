import express from "express";
import { authMiddleware } from "../middlewares/AuthMiddleware.js";
import {
  addMemberToGroup,
  deleteChat,
  getChatDetails,
  getMyChats,
  leaveGroup,
  myGroups,
  newGroupChat,
  removeMembers,
  renameGroup,
  sendAttachments,
} from "../controllers/ChatController.js";
import { attachmentsMulter } from "../middlewares/Multer.js";

const router = express.Router();

router.post("/newGroup", authMiddleware, newGroupChat);
router.get("/myChats", authMiddleware, getMyChats);
router.get("/myGroups", authMiddleware, myGroups);
router.put("/addMember", authMiddleware, addMemberToGroup);
router.put("/removeMember", authMiddleware, removeMembers);
router.delete("/leave/:id", authMiddleware, leaveGroup);
router.post("/messages", authMiddleware, attachmentsMulter, sendAttachments);
router
  .route("/:id")
  .get(authMiddleware, getChatDetails)
  .put(authMiddleware, renameGroup)
  .delete(authMiddleware, deleteChat);

export default router;
