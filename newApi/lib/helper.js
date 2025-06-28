import { userSocketIds } from "../app.js";

export const getSockets = (users = []) => {
  const sockets = users
    .map((user) => {
      const socketId = userSocketIds.get(user.toString());
      if (!socketId) {
        console.warn(`User ${user} is not connected (no socketId found)`);
      }
      return socketId;
    })
    .filter(Boolean); // Remove undefined values
  return sockets;
};
