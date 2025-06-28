import { userSocketIds } from "../app.js";

export const getSockets = (users = []) => {
  const sockets = users.map((user) => userSocketIds.get(user.toString()));
  return sockets;
};
