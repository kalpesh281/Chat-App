export const getSockets = (users = []) => {
  const sockets = users.map((user) => userSocketIds.get(user._id.toString()));
  return sockets;
};
