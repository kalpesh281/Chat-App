import { Stack } from "@mui/material";
import React from "react";
import ChatItem from "../shared/ChatItem";

const ChatList = ({
  w = "100%",
  chats = [],
  chatId,
  onlineUsers = [],
  newMessagesAlert = [],
  handleDeleteChat,
}) => {
  return (
    <Stack width={w} direction={"column"}>
      {chats?.map((data, index) => {
        const { _id, avatar, name, groupChat, members } = data;

        // Find the new message alert for this chat
        const newMessageAlert = newMessagesAlert.find(
          (alert) => alert.chatId === _id
        );

        // Determine if the user is online (for groupChat, you may want to adjust logic)
        const isOnline = !groupChat && onlineUsers.includes(_id);

        const isSelected = chatId === _id;

        return (
          <ChatItem
            newMessageAlert={newMessageAlert}
            isOnline={isOnline}
            avatar={avatar}
            name={name}
            _id={_id}
            groupChat={groupChat}
            key={_id}
            sameSender={isSelected}
            handleDeleteChat={handleDeleteChat}
            index={index}
          />
        );
      })}
    </Stack>
  );
};

export default ChatList;
