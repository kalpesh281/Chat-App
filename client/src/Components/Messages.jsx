import React, { useEffect, useRef } from "react";
import Message from "./Message";
import useGetMessages from "../hooks/useGetMessages";
import { useSelector } from "react-redux";

function Messages() {
  useGetMessages();
  const { messages } = useSelector((store) => store.message);
  const messagesEndRef = useRef(null);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (!messages || !Array.isArray(messages)) return null;

  return (
    <div className="px-4 w-full">
      {messages.map((message) => (
        <Message key={message._id} message={message} />
      ))}
      <div ref={messagesEndRef} /> {/* Empty div for scrolling to bottom */}
    </div>
  );
}

export default Messages;
