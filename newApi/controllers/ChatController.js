import { ALERT, REFETCH_CHATS } from "../constants/events.js";
import { Chat } from "../models/ChatSchema.js";
import { User } from "../models/UserSchema.js";
import { emitEvent } from "../utils/features.js";

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

export { newGroupChat, getMyChats, myGroups, addMemberToGroup };
