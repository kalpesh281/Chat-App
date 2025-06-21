import { User } from "../models/UserSchema.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Chat } from "../models/ChatSchema.js";
import { Request } from "../models/RequestSchema.js";
import { emitEvent } from "../utils/features.js";
import { NEW_REQUEST } from "../constants/events.js";

const Register = async (req, res) => {
  try {
    const { name, username, password, bio } = req.body;

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
      { userId: user._id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    // Set cookie
    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "strict",
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
    const { name } = req.query;
    const currentUserId = req.id; // Using req.id as set by your auth middleware
    // console.log("Current user ID:", currentUserId);

    if (!name) {
      return res.status(400).json({
        success: false,
        message: "Name query parameter is required",
      });
    }
    const myChats = await Chat.find({
      members: currentUserId,
    });
    //the list of the user in my chats means friends
    const allUserFromMyChats = myChats.flatMap((chat) => chat.members);

    const uniqueUserIds = [
      ...new Set(allUserFromMyChats.map((id) => id.toString())),
    ];
    const friendUserIds = uniqueUserIds.filter(
      (id) => id !== currentUserId.toString()
    );

    // console.log("All Friend User IDs:", friendUserIds);

    // Add current user to the exclusion list to ensure they don't appear in results
    const usersToExclude = [...friendUserIds, currentUserId.toString()];

    const allUsersExpectMeAndFriends = await User.find({
      _id: { $nin: usersToExclude },
      name: { $regex: name, $options: "i" },
    });

    // console.log("Other Remaining Users:", allUsersExpectMeAndFriends.map(user => ({ id: user._id, name: user.name })));

    const users = allUsersExpectMeAndFriends.map((user) => ({
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

export { Register, Login, Logout, CheckCreds, SearchUser, sendFriendRequest };
