import { Avatar, AvatarGroup } from "@mui/material";
import React from "react";

const AvatarCard = ({ avatar = [], max = 4 }) => {
  return (
    <AvatarGroup
      max={max}
      sx={{
        "& .MuiAvatar-root": {
          width: 36,
          height: 36,
          fontSize: "0.9rem",
          border: "2px solid #fff",
        },
        justifyContent: "flex-start",
        width: "fit-content",
      }}
    >
      {avatar.map((i, index) => (
        <Avatar key={index} src={i} alt={`Avatar ${index + 1}`} />
      ))}
    </AvatarGroup>
  );
};

export default AvatarCard;
