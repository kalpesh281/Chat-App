import { User } from "../models/UserSchema.js";
import { Chat } from "../models/ChatSchema.js";

const allUsers = async (req, res) => {
  try {
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



export { allUsers };
