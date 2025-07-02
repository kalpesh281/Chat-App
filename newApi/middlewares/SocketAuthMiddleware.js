import jwt from "jsonwebtoken";
import { User } from "../models/UserSchema.js";

const socketAuthenticator = async (err, socket, next) => {
  try {
    if (err) {
      console.error("Socket connection error:", err);
      return next(new Error("Connection error"));
    }

    // Try to get token from cookies or handshake auth
    const authToken =
      socket.request.cookies?.token || socket.handshake.auth?.token;

    // console.log("Auth token received:", authToken);

    if (!authToken) {
      return next(new Error("Please login to access this route"));
    }

    // Verify token
    const decodedData = jwt.verify(authToken, process.env.JWT_SECRET);

    // Find user by decoded userId
    const user = await User.findById(decodedData.userId);

    if (!user) {
      return next(new Error("Please login to access this route"));
    }

    // Attach user to socket
    socket.user = user;
    socket.id = user._id.toString(); // Assuming _id is the user identifier in your database

    // console.log("Socket authenticated successfully:", socket.user);
    return next();
  } catch (error) {
    console.error("Socket authentication error:", error);
    return next(new Error("Please login to access this route"));
  }
};

export { socketAuthenticator };
