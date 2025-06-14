import { Box } from "@mui/material";
import moment from "moment";
import React, { memo } from "react";
import { fileFormat } from "../../libs/features";
import RenderAttatchment from "./RenderAttatchment";

function MessageComponent({ message, user }) {
  const { sender, content, attachments = [], createdAt } = message;

  const sameSender = sender._id === user._id;

  const timeAgo = moment(createdAt).fromNow();

  return (
    <div
      style={{
        alignSelf: sameSender ? "flex-end" : "flex-start",
        backgroundColor: sameSender ? "#e0f7fa" : "#fff3e0",
        borderRadius: "8px",
        padding: "10px",
        maxWidth: "70%",
        margin: "5px 0",
        display: "flex",
        flexDirection: "column",
        alignItems: sameSender ? "flex-end" : "flex-start",
        boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
        position: "relative",
        wordBreak: "break-word",
        fontSize: "14px",
        lineHeight: "1.5",
        color: "#333",
        fontFamily: "Arial, sans-serif",
        transition: "background-color 0.3s ease",
        cursor: "pointer",
      }}
    >
      {!sameSender && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "5px",
            color: "gray",
            fontSize: "12px",
          }}
        >
          <span>{sender.name}</span>
        </div>
      )}
      {content && (
        <div
          style={{
            marginBottom: "5px",
            whiteSpace: "pre-wrap",
            fontWeight: sameSender ? "normal" : "bold",
            color: sameSender ? "#000" : "#555",
          }}
        >
          {content}
        </div>
      )}

      {attachments.length > 0 &&
        attachments.map((attachment, index) => {
          const url = attachment.url;
          const file = fileFormat(url);

          return (
            <Box key={index}>
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                download
                style={{
                  textDecoration: "none",
                  color: "inherit",
                  display: "inline-block",
                  marginBottom: "5px",
                }}
              >
                <RenderAttatchment file={file} url={url} />
              </a>
            </Box>
          );
        })}

      <div
        style={{
          marginBottom: "5px",
          color: "#555",
          fontSize: "8px",
          fontStyle: "italic",
        }}
      >
        {timeAgo}
      </div>
    </div>
  );
}

export default memo(MessageComponent);
