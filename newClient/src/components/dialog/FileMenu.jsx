import {
  ListItemText,
  Menu,
  MenuItem,
  MenuList,
  Tooltip,
  Box,
} from "@mui/material";
import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setIsFileMenu,
  setUploadingLoader,
} from "../../redux/reducers/miscSlice";
import {
  Image as LucideImage,
  Music as LucideAudio,
  Video as LucideVideo,
  FileText as LucideDocument,
} from "lucide-react";
import toast from "react-hot-toast";

const fileOptions = [
  {
    key: "Image",
    label: "Image",
    icon: <LucideImage size={20} strokeWidth={1.8} />,
    accept: "image/*",
  },
  {
    key: "Audio",
    label: "Audio",
    icon: <LucideAudio size={20} strokeWidth={1.8} />,
    accept: "audio/*",
  },
  {
    key: "Video",
    label: "Video",
    icon: <LucideVideo size={20} strokeWidth={1.8} />,
    accept: "video/*",
  },
  {
    key: "Document",
    label: "Document",
    icon: <LucideDocument size={20} strokeWidth={1.8} />,
    accept:
      ".pdf,.doc,.docx,.xls,.xlsx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  },
];

function FileMenu({ anchorE1 }) {
  const dispatch = useDispatch();
  const { isFileMenu } = useSelector((state) => state.misc);

  const inputRefs = useRef({});

  const handleClose = () => dispatch(setIsFileMenu(false));

  const handleMenuItemClick = (key) => {
    inputRefs.current[key]?.click();
  };

  const handleFileChange = (e, key) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    if (fileOptions.length > 5)
      return toast.error(`You can only select up to 5 ${key} at a time.`);

    dispatch(setUploadingLoader(true));

    const toastId = toast.loading(`Sending ${key}...`);
    handleClose();

    try {
    } catch (error) {
      toast.error(error?.message || "Failed to send file", {
        id: toastId,
      });
    } finally {
      dispatch(setUploadingLoader(false));
    }
  };

  return (
    <Menu
      open={isFileMenu}
      onClose={handleClose}
      anchorEl={anchorE1}
      PaperProps={{
        sx: {
          borderRadius: 2,
          minWidth: 180,
          boxShadow: 3,
          p: 0.5,
        },
      }}
    >
      <MenuList>
        {fileOptions.map(({ key, label, icon, accept }) => (
          <MenuItem
            key={key}
            onClick={() => handleMenuItemClick(key)}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1.5,
              borderRadius: 1,
              transition: "background 0.2s",
              "&:hover": {
                background: "#f0f4fa",
              },
              py: 1,
              px: 2,
            }}
          >
            <Tooltip title={label} placement="left">
              <Box
                sx={{ color: "#1976d2", display: "flex", alignItems: "center" }}
              >
                {icon}
              </Box>
            </Tooltip>
            <ListItemText
              primary={label}
              primaryTypographyProps={{
                fontWeight: 500,
                fontSize: 15,
                color: "#222",
              }}
              sx={{ ml: 1 }}
            />
            <input
              ref={(el) => (inputRefs.current[key] = el)}
              type="file"
              accept={accept}
              multiple
              style={{ display: "none" }}
              onChange={(e) => handleFileChange(e, key)}
              tabIndex={-1}
            />
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
}

export default FileMenu;
