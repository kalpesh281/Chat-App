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


        const newMessageAlert = { chatId: _id, count: index + 1 };

      
        const isSelected = chatId === _id;

        return (
          <ChatItem
            newMessageAlert={newMessageAlert}
            isOnline={true} 
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
