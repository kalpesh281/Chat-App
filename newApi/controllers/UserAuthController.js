import { User } from "../models/UserSchema.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Chat } from "../models/ChatSchema.js";
import { Request } from "../models/RequestSchema.js";
import { emitEvent } from "../utils/features.js";
import { NEW_REQUEST, REFETCH_CHATS } from "../constants/events.js";

const Register = async (req, res) => {
  try {
    const { name, username, password, bio, role } = req.body;

    if (!name || !username || !password) {
      return res.status(400).json({
        success: false,
        message: "Name, username, and password are required",
      });
    }

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Username already exists",
      });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = new User({
      name,
      username,
      password: hashedPassword,
      bio: bio || "",
      role: role || "user",
    });

    const savedUser = await newUser.save();

    res.status(201).json({
      success: true,
      message: "User registered successfully",
    });
  } catch (error) {
    console.error("Register error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const Login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Validate required fields
    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: "Username and password are required",
      });
    }

    // Find user by username
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid username or password",
      });
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({
        success: false,
        message: "Invalid username or password",
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, username: user.username, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    // Set cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: true, 
      sameSite: "None", 
      maxAge: 1 * 24 * 60 * 60 * 1000,
    });
    
    const userResponse = {
      _id: user._id,
      username: user.username,
      role: user.role,
    };
    res.status(200).json({
      success: true,
      message: "Login successful",
      user: userResponse,
      token,
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const Logout = async (req, res) => {
  try {
    // console.log("Logout request received");
    res.clearCookie("token", {
      httpOnly: true,
      sameSite: "strict",
    });

    res.status(200).json({
      success: true,
      message: "Logout successful",
    });
  } catch (error) {
    console.error("Logout error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const CheckCreds = async (req, res) => {
  try {
    const { username, role } = req.body;

    // Validate required fields
    if (!username || !role) {
      return res.status(400).json({
        success: false,
        message: "Username and role are required",
      });
    }

    // Find user by username
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Check if the role matches
    if (user.role !== role) {
      return res.status(403).json({
        success: false,
        message: "Role does not match",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Credentials verified successfully",
      user: {
        username: user.username,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("CheckCreds error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const SearchUser = async (req, res) => {
  try {
    const { name = "" } = req.query;
    const currentUserId = req.id;

    // Find all my chats (only private chats)
    const myChats = await Chat.find({ groupChat: false, members: currentUserId });

    // Extract all users from my chats (friends)
    const allUsersFromMyChats = myChats.flatMap((chat) => chat.members.map(id => id.toString()));

    // Add current user to exclusion list
    const usersToExclude = [...new Set([...allUsersFromMyChats, currentUserId.toString()])];

    // Build query
    const userQuery = { _id: { $nin: usersToExclude } };
    if (name) {
      userQuery.name = { $regex: name, $options: "i" };
    }

    // Find users
    const allUsersExceptMeAndFriends = await User.find(userQuery);

    const users = allUsersExceptMeAndFriends.map((user) => ({
      _id: user._id,
      name: user.name,
      username: user.username,
      bio: user.bio,
    }));

    res.status(200).json({
      success: true,
      message: "Search results",
      users,
    });
  } catch (error) {
    console.error("SearchUser error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const getProfileDetails = async (req, res) => {
  try {
    const user = await User.findById(req.id).select("-password -__v");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const userProfile = {
      _id: user._id,
      name: user.name,
      username: user.username,
      bio: user.bio,
      createdAt: user.createdAt,
    };

    res.status(200).json({
      success: true,
      message: "Profile details retrieved successfully",
      user: userProfile,
    });
  } catch (error) {
    console.error("getProfileDetails error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const sendFriendRequest = async (req, res) => {
  try {
    const { userId } = req.body;

    const request = await Request.findOne({
      $or: [
        { sender: req.id, receiver: userId },
        { sender: userId, receiver: req.id },
      ],
    });

    if (request) {
      return res.status(400).json({
        success: false,
        message: "Friend request already sent",
      });
    }
    await Request.create({
      sender: req.id,
      receiver: userId,
    });

    emitEvent(req, NEW_REQUEST, [userId]);

    res.status(200).json({
      success: true,
      message: "Friend request sent successfully",
    });
  } catch (error) {
    console.error("sendFriendRequest error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const acceptFriendRequest = async (req, res) => {
  try {
    const { requestId, accept } = req.body;
    console.log(req.id);
    console.log("requestId:", requestId);
    console.log("accept:", accept);
    const request = await Request.findById(requestId)
      .populate("sender", "name")
      .populate("receiver", "name");

    console.log("Request found:", request);
    console.log("Current user ID:", req.id);
    console.log("Sender ID:", request?.sender?._id?.toString());
    console.log("Receiver ID:", request?.receiver?._id?.toString());

    if (!request) {
      return res.status(404).json({
        success: false,
        message: "Friend request not found",
      });
    }

    if (request.sender._id.toString() === req.id) {
      return res.status(403).json({
        success: false,
        message: "You can't accept friend request from yourself",
      });
    }

    // Fix: request.receiver is populated, so we need to access _id
    if (request.receiver._id.toString() !== req.id) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to accept this request",
      });
    }

    if (!accept) {
      await Request.findByIdAndDelete(requestId);

      res.status(200).json({
        success: true,
        message: "Friend request rejected successfully",
      });
    }

    const members = [request.sender._id, request.receiver._id];
    await Promise.all([
      Chat.create({
        members,
        groupName: `${request.sender.name} - ${request.receiver.name}`,
      }),
      request.deleteOne(),
    ]);
    emitEvent(req, REFETCH_CHATS, members);

    res.status(200).json({
      success: true,
      message: "Friend request accepted successfully",
    });
  } catch (error) {
    console.error("acceptFriendRequest error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const getAllNotifications = async (req, res) => {
  try {
    // console.log("getAllNotifications called for user ID:", req.id);
    const requests = await Request.find({
      receiver: req.id,
    })
      .populate("sender", "name username")
      .sort({ createdAt: -1 });

    if (!requests || requests.length === 0) {
      return res.status(200).json({
        success: true,
        message: "No notifications found",
        requests: [],
      });
    } // Filter to return only specific fields
    const filteredRequests = requests.map((request) => ({
      _id: request._id,
      status: request.status,
      sender: {
        _id: request.sender._id,
        name: request.sender.name,
        username: request.sender.username,
      },
    }));

    res.status(200).json({
      success: true,
      message: "Notifications retrieved successfully",
      requests: filteredRequests,
    });
  } catch (error) {
    console.error("getAllNotifications error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const getMyFriends = async (req, res) => {
  try {
    const chatId = req.query.chatId;
    const chats = await Chat.find({
      members: req.id,
      groupChat: false,
    }).populate("members", "name username ");
    if (!chats || chats.length === 0) {
      return res.status(200).json({
        success: true,
        message: "No friends found",
        friends: [],
      });
    }

    const friends = chats.map((chat) => {
      const friend = chat.members.find(
        (member) => member._id.toString() !== req.id
      );
      return {
        _id: friend._id,
        name: friend.name,
        username: friend.username,
        chatId: chat._id,
      };
    });

    if (chatId) {
      // console.log("Chat ID provided:", chatId);
      const chat = await Chat.findById(chatId);
      const availableFriends = friends.filter(
        (friend) => !chat.members.includes(friend._id)
      );

      return res.status(200).json({
        success: true,
        message: "Friends retrieved successfully",
        friends: availableFriends,
      });
    } else {
      // console.log("No Chat ID provided, returning all friends");
      return res.status(200).json({
        success: true,
        message: "Friends retrieved successfully",
        friends,
      });
    }
  } catch (error) {
    console.error("getMyFriends error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export {
  Register,
  Login,
  Logout,
  CheckCreds,
  SearchUser,
  getProfileDetails,
  sendFriendRequest,
  acceptFriendRequest,
  getAllNotifications,
  getMyFriends,
};

