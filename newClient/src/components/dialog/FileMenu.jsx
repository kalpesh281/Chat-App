import { Menu } from "@mui/material";
import React from "react";

function FileMenu({ anchorE1 }) {
  return (
    <Menu
      //open={true}
      anchorEl={anchorE1}
    ></Menu>
  );
}

export default FileMenu;
