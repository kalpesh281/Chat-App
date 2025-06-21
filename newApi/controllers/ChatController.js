import {
  ALERT,
  NEW_ATTACHMENT,
  NEW_MESSAGE_ALERT,
  REFETCH_CHATS,
} from "../constants/events.js";
import { Chat } from "../models/ChatSchema.js";
import { Message } from "../models/MessageSchema.js";
import { User } from "../models/UserSchema.js";
import { deleteFilesFromCloudinary, emitEvent } from "../utils/features.js";

const newGroupChat = async (req, res) => {
  try {
    const { groupName, members } = req.body;

    if (!groupName || !members || members.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Group name and members are required",
      });
    }

    if (members.length < 2) {
      return res.status(400).json({
        success: false,
        message: "At least two members are required to create a group chat",
      });
    }

    const allMembers = [...members, req.id];

    const newChat = new Chat({
      groupName,
      groupChat: true,
      creator: req.id,
      members: allMembers,
    });

    const savedChat = await newChat.save();

    emitEvent(req, ALERT, allMembers, `Welcome to the ${groupName} group`);
    emitEvent(req, REFETCH_CHATS, members);

    return res.status(201).json({
      success: true,
      message: "Group chat created successfully",
      chat: savedChat,
    });
  } catch (error) {
    console.error("newGroupChat error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const getMyChats = async (req, res) => {
  try {
    const chats = await Chat.find({
      members: { $in: [req.id] },
    }).populate("members", "name username ");

    const transformedChats = chats.map(({ _id, name, members, groupChat }) => {
      return {
        _id,
        name: groupChat
          ? name
          : members.find(
              (member) => member._id.toString() !== req.id.toString()
            ).name,
        members: members.map((member) => ({
          _id: member._id,
          name: member.name,
          username: member.username,
        })),
        groupChat,
      };
    });

    return res.status(200).json({
      success: true,
      chats: transformedChats,
    });
  } catch (error) {
    console.error("getMyChats error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const myGroups = async (req, res) => {
  try {
    const chats = await Chat.find({
      members: { $in: [req.id] },
      groupChat: true,
      creator: req.id,
    }).populate("members", "name username");

    const transformedChats = chats.map(
      ({ _id, groupName, members, groupChat }) => {
        return {
          _id,
          groupName,
          groupChat,
          //member data
          // members: members.map((member) => ({
          //   _id: member._id,
          //   name: member.name,
          //   username: member.username,
          // })),
        };
      }
    );

    return res.status(200).json({
      success: true,
      chats: transformedChats,
    });
  } catch (error) {
    console.error("myGroups error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const addMemberToGroup = async (req, res) => {
  try {
    const { chatId, members } = req.body;

    if (!chatId || !members || members.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Chat ID and members are required",
      });
    }

    const chat = await Chat.findById(chatId);
    if (!chat) {
      return res.status(404).json({
        success: false,
        message: "Chat not found",
      });
    }
    if (!chat.groupChat) {
      return res.status(400).json({
        success: false,
        message: "This chat is not a group chat",
      });
    }
    if (chat.creator.toString() !== req.id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Only the group creator can add members",
      });
    }

    const allMembersPromise = members.map((i) => User.findById(i, "name"));
    const allMembers = await Promise.all(allMembersPromise);

    const uniqueMembers = allMembers
      .filter(
        (member) => member && !chat.members.includes(member._id.toString())
      )
      .map((member) => member._id);

    chat.members.push(...uniqueMembers);
    await chat.save();

    const allUsersNames = allMembers.map((i) => i.name).join(",");
    emitEvent(req, ALERT, chat.members, `Added ${allUsersNames} to the group`);
    return res.json({
      success: true,
      message: "Members added successfully",
    });
  } catch (error) {
    console.error("addMemberToGroup error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const removeMembers = async (req, res) => {
  try {
    const { chatId, userId } = req.body;
    if (!chatId || !userId) {
      return res.status(400).json({
        success: false,
        message: "Chat ID and user ID are required",
      });
    }
    const chat = await Chat.findById(chatId);
    if (!chat) {
      return res.status(404).json({
        success: false,
        message: "Chat not found",
      });
    }
    if (!chat.groupChat) {
      return res.status(400).json({
        success: false,
        message: "This chat is not a group chat",
      });
    }
    if (chat.creator.toString() !== userId) {
      return res.status(403).json({
        success: false,
        message: "Only the group creator can remove members",
      });
    }

    if (chat.members.length <= 3) {
      return res.status(400).json({
        success: false,
        message: "Cannot remove members, at least two members are required",
      });
    }

    chat.members = chat.members.filter(
      (member) => member.toString() !== userId.toString()
    );
    await chat.save();
    const removedUser = await User.findById(userId, "name");
    emitEvent(
      req,
      ALERT,
      chat.members,
      `Removed ${removedUser.name} from the group`
    );
    return res.json({
      success: true,
      message: "Member removed successfully",
    });
  } catch (error) {
    console.error("removeMembers error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const leaveGroup = async (req, res) => {
  try {
    const chatId = req.params.id;

    if (!chatId) {
      return res.status(400).json({
        success: false,
        message: "Chat ID is required",
      });
    }

    const chat = await Chat.findById(chatId);
    if (!chat) {
      return res.status(404).json({
        success: false,
        message: "Chat not found",
      });
    }

    if (!chat.groupChat) {
      return res.status(400).json({
        success: false,
        message: "This chat is not a group chat",
      });
    }

    const remainingMembers = chat.members.filter(
      (member) => member.toString() !== req.id.toString()
    );

    if (chat.creator.toString() === req.id.toString()) {
      if (remainingMembers.length === 0) {
        await Chat.findByIdAndDelete(chatId);
        return res.json({
          success: true,
          message: "Group deleted as you were the last member",
        });
      } else {
        chat.creator = remainingMembers[0];
      }
    }

    chat.members = remainingMembers;

    const user = await User.findById(req.id, "name");
    await chat.save();
    emitEvent(req, ALERT, chat.members, `${user.name} has left the group`);
    return res.json({
      success: true,
      message: "You have left the group successfully",
    });
  } catch (error) {
    console.error("leaveGroup error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const sendAttachments = async (req, res) => {
  try {
    const { chatId } = req.body;
    console.log("sendAttachments called with chatId:", chatId);
    console.log("req.files:", req.files);
    console.log("req.file:", req.file);

    const [chat, me] = await Promise.all([
      Chat.findById(chatId),
      User.findById(req.id, "name username"),
    ]);

    const files = req.files || [];
    if (!chat) {
      return res.status(404).json({
        success: false,
        message: "Chat not found",
      });
    }
    if (!chatId || !files || files.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Chat ID and files are required",
      });
    }

    // Process uploaded files into proper attachment format
    const attachments = files.map((file, index) => ({
      public_id: `attachment_${Date.now()}_${index}`,
      url: `http://localhost:5001/uploads/${file.filename}`,
    }));

    const messageForRealTime = {
      content: "",
      attachments,
      sender: {
        _id: me._id,
        name: me.name,
      },
      chat: chatId,
    };

    const messageForDb = {
      content: "",
      attachments,
      sender: me._id,
      chat: chatId, // Changed from chatId to chat
    };

    const message = await Message.create(messageForDb);

    emitEvent(req, NEW_ATTACHMENT, chat.members, {
      message: messageForRealTime,
      chatId,
    });
    emitEvent(req, NEW_MESSAGE_ALERT, chat.members, { chatId });

    res.status(200).json({
      success: true,
      message,
    });
  } catch (error) {
    console.error("sendAttachments error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const getChatDetails = async (req, res) => {
  try {
    if (req.query.populate === "true") {
      //   console.log("true");
      const chat = await Chat.findById(req.params.id)
        .populate("members", "name username")
        .lean();
      if (!chat) {
        return res.status(404).json({
          success: false,
          message: "Chat not found",
        });
      }
      chat.members = chat.members.map(({ _id, name, username }) => ({
        _id,
        name,
        username: chat.members.find(
          (member) => member._id.toString() === _id.toString()
        ).username,
      }));
      return res.status(200).json({
        success: true,
        chat,
      });
    } else {
      //   console.log("false");
      const chat = await Chat.findById(req.params.id);
      if (!chat) {
        return res.status(404).json({
          success: false,
          message: "Chat not found",
        });
      }
      return res.status(200).json({
        success: true,
        chat,
      });
    }
  } catch (error) {
    console.error("chatDetails error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const renameGroup = async (req, res) => {
  try {
    const chatId = req.params.id;
    const { groupName } = req.body;
    if (!chatId || !groupName) {
      return res.status(400).json({
        success: false,
        message: "Chat ID and group name are required",
      });
    }
    const chat = await Chat.findById(chatId);
    if (!chat) {
      return res.status(404).json({
        success: false,
        message: "Chat not found",
      });
    }
    if (!chat.groupChat) {
      return res.status(400).json({
        success: false,
        message: "This chat is not a group chat",
      });
    }
    if (chat.creator.toString() !== req.id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Only the group Admin can rename the group",
      });
    }
    chat.groupName = groupName;
    await chat.save();
    emitEvent(req, ALERT, chat.members, `Group renamed to ${groupName}`);
    return res.status(200).json({
      success: true,
      message: "Group renamed successfully",
    });
  } catch (error) {
    console.error("renameGroup error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const deleteChat = async (req, res) => {
  try {
    const chatId = req.params.id;
    if (!chatId) {
      return res.status(400).json({
        success: false,
        message: "Chat ID is required",
      });
    }
    const chat = await Chat.findById(chatId);
    if (!chat) {
      return res.status(404).json({
        success: false,
        message: "Chat not found",
      });
    }

    const members = chat.members;
    if (chat.groupChat && chat.creator.toString() !== req.id.toString()) {
      return res.status(403).json({
        success: false,
        message: "You are not allowed to delete this group chat",
      });
    }
    if (!chat.groupChat && !chat.members.includes(req.id)) {
      return res.status(403).json({
        success: false,
        message: "You are not a member of this chat",
      });
    }

    // Delete the all the messages in the chat and also all the attachments from the cloudinary
    const messagesWithAttachments = await Message.find({
      chat: chatId,
      attachments: { $exists: true, $ne: [] },
    });

    const public_ids = [];
    messagesWithAttachments.forEach(({ attachments }) =>
      attachments.forEach(({ public_id }) => public_ids.push(public_id))
    );
    await Promise.all([
      deleteFilesFromCloudinary(public_ids),
      chat.deleteOne(),
      Message.deleteMany({ chat: chatId }),
    ]);

    emitEvent(req, REFETCH_CHATS, members);
    return res.status(200).json({
      success: true,
      message: "Chat deleted successfully",
    });
  } catch (error) {
    console.error("deleteChat error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const getMessages = async (req, res) => {
  try {
    const chatId = req.params.id;
    const { page = 1 } = req.query;
    if (!chatId) {
      return res.status(400).json({
        success: false,
        message: "Chat ID is required",
      });
    }

    const limit = 20;
    const skip = (page - 1) * limit;
    const [messages, totalMessages] = await Promise.all([
      Message.find({ chat: chatId })
        .populate("sender", "name username")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      Message.countDocuments({ chat: chatId }),
    ]);

    const totalPages = Math.ceil(totalMessages / limit);

    return res.status(200).json({
      success: true,
      messages: messages.reverse(),
      totalPages,
    });
  } catch (error) {
    console.error("getMessages error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export {
  newGroupChat,
  getMyChats,
  myGroups,
  addMemberToGroup,
  removeMembers,
  leaveGroup,
  sendAttachments,
  getChatDetails,
  renameGroup,
  deleteChat,
  getMessages,
};
