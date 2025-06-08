import React from "react";
import { Avatar, AvatarGroup } from "@mui/material";

const AvatarCard = ({ avatar = [], firstLetter = "", name = "" }) => {
  return avatar.length > 0 ? (
    <AvatarGroup max={2} sx={{ position: "relative" }}>
      {avatar.map((i, index) => (
        <Avatar
          key={index}
          src={i}
          alt={name || "User"}
          sx={{
            width: 40,
            height: 40,
            borderWidth: 2,
            backgroundColor: "primary.main",
            color: "white",
          }}
        >
          {firstLetter}
        </Avatar>
      ))}
    </AvatarGroup>
  ) : (
    <Avatar
      src=""
      alt={name || "User"}
      sx={{
        width: 40,
        height: 40,
        backgroundColor: "primary.main",
        color: "white",
      }}
    >
      {firstLetter}
    </Avatar>
  );
};

export default AvatarCard;
