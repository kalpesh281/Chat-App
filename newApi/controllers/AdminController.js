import { User } from "../models/UserSchema.js";
import { Chat } from "../models/ChatSchema.js";
import { Message } from "../models/MessageSchema.js";

const allUsers = async (req, res) => {
  try {
    const { role } = req.user;
    if (role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Access denied. Admin role required.",
      });
    }
    console.log("Fetching all users");

    const users = await User.find({ _id: { $ne: req.user.userId } }).select(
      "-password -__v -email -createdAt -bio"
    );
    if (!users || users.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No users found",
      });
    }

    const usersWithCounts = await Promise.all(
      users.map(async (user) => {
        const friendChats = await Chat.find({
          members: user._id,
          groupChat: false,
        });
        const friendsCount = friendChats.length;

        const groupChats = await Chat.find({
          members: user._id,
          groupChat: true,
        });
        const groupsCount = groupChats.length;

        return {
          _id: user._id,
          name: user.name,
          username: user.username,
          role: user.role,
          updatedAt: user.updatedAt,
          friendsCount,
          groupsCount,
        };
      })
    );

    return res.status(200).json({
      success: true,
      message: "Users fetched successfully",
      data: {
        users: usersWithCounts,
        count: usersWithCounts.length,
      },
    });
  } catch (error) {
    console.error("Error in allUsers controller:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while fetching users",
    });
  }
};

const allGroups = async (req, res) => {
  try {
    const { role } = req.user;
    if (role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Access denied. Admin role required.",
      });
    }
    const groups = await Chat.find({ groupChat: true })
      .populate("creator", "username name")
      .select("-__v");

    if (!groups || groups.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No groups found",
      });
    }
    const groupsWithDetails = await Promise.all(
      groups.map(async (group) => {
        const messageCount = await Message.countDocuments({ chat: group._id });

        return {
          _id: group._id,
          groupName: group.groupName,
          creator: {
            username: group.creator.username,
            name: group.creator.name,
          },
          members: group.members.length,
          messages: messageCount,
          createdAt: group.createdAt,
          updatedAt: group.updatedAt,
        };
      })
    );

    console.log("Fetched groups:", groupsWithDetails);
    return res.status(200).json({
      success: true,
      message: "Groups fetched successfully",
      data: {
        groups: groupsWithDetails,
        count: groupsWithDetails.length,
      },
    });
  } catch (error) {
    console.error("Error in allGroups controller:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while fetching groups",
    });
  }
};

const allTotalMessages = async (req, res) => {
  try {
    const { role } = req.user;
    if (role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Access denied. Admin role required.",
      });
    }
    const totalMessages = await Message.countDocuments();

    if (totalMessages === 0) {
      return res.status(404).json({
        success: false,
        message: "No messages found",
      });
    }

    // Get all messages with detailed information
    const messages = await Message.find({})
      .populate("sender", "username name")
      .populate("chat", "groupChat groupName")
      .sort({ createdAt: -1 })
      .select("-__v");

    // Transform messages to include required details
    const messagesWithDetails = messages.map((message) => ({
      _id: message._id,
      content: message.content,
      Attachment: message.attachments && message.attachments.length > 0,
      sentBy: {
        _id: message.sender._id,
        username: message.sender.username,
      },
      groupChat: message.chat.groupChat,
      chatName: message.chat.groupChat ? message.chat.groupName : "--",
      createdAt: message.createdAt,
    }));

    return res.status(200).json({
      success: true,
      message: "All messages fetched successfully",
      data: {
        messages: messagesWithDetails,
        totalMessages,
      },
    });
  } catch (error) {
    console.error("Error in allTotalMessages controller:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while fetching total messages",
    });
  }
};

const getDashboardStats = async (req, res) => {
  try {
    const { role } = req.user;
    if (role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Access denied. Admin role required.",
      });
    }
    const [usersCount, groupsCount, messagesCount, totalChatCount] =
      await Promise.all([
        User.countDocuments(),
        Chat.countDocuments({ groupChat: true }),
        Message.countDocuments(),
        Chat.countDocuments(),
      ]);

    const stats = {
      usersCount,
      groupsCount,
      messagesCount,
      totalChatCount,
    };

    const today = new Date();
    const last7Days = new Date();
    last7Days.setDate(last7Days.getDate() - 7);

    const last7DaysMessages = await Message.find({
      createdAt: { $gte: last7Days, $lte: today },
    }).select("createdAt -_id");

    const messages = new Array(7).fill(0);
    last7DaysMessages.forEach((message) => {
      const messageDate = new Date(message.createdAt);
      const dayIndex = (today.getDay() - messageDate.getDay() + 7) % 7;
      messages[dayIndex]++;
    });

    return res.status(200).json({
      success: true,
      message: "Dashboard stats fetched successfully",
      stats,
      messagesChart: messages,
    });
  } catch (error) {
    console.error("Error in getDashboardStash controller:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while fetching dashboard stash",
    });
  }
};
const adminLogout = async (req, res) => {
  try {
    
    res.clearCookie("token", {
      httpOnly: true,
      sameSite: "strict",
    });

    return res.status(200).json({
      success: true,
      message: "Admin logged out successfully",
    });
  } catch (error) {
    console.error("Error in adminLogout controller:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while logging out",
    });
  }
};

export {
  allUsers,
  allGroups,
  allTotalMessages,
  getDashboardStats,
  adminLogout,
};
