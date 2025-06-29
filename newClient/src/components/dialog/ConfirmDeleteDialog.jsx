import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  Box,
  Typography,
  IconButton,
  useTheme,
  Divider,
  Slide,
  Avatar,
} from "@mui/material";
import {
  Trash2 as DeleteOutlineIcon,
  X as CloseIcon,
  AlertTriangle as WarningAmberIcon,
} from "lucide-react"; // lucide-react icons

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function ConfirmDeleteDialog({ open, handleClose, deleteHandle }) {
  const theme = useTheme();

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      TransitionComponent={Transition}
      PaperProps={{
        sx: {
          borderRadius: 2,
          width: "100%",
          maxWidth: 400,
          boxShadow: "0 8px 25px rgba(0, 0, 0, 0.15)",
          position: "relative",
          overflow: "visible",
          "&:before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "4px",
            background: theme.palette.error.main,
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8,
          },
        },
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: -20,
          left: "50%",
          transform: "translateX(-50%)",
        }}
      >
        <Avatar
          sx={{
            bgcolor: theme.palette.error.main,
            width: 56,
            height: 56,
            boxShadow: "0 4px 14px rgba(211, 47, 47, 0.2)",
          }}
        >
          <WarningAmberIcon size={28} />
        </Avatar>
      </Box>

      <DialogTitle
        sx={{
          mt: 3.5,
          textAlign: "center",
          pb: 1,
        }}
      >
        <Typography
          variant="h5"
          component="div"
          fontWeight="bold"
          color="text.primary"
        >
          Confirm Delete
        </Typography>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: theme.palette.grey[500],
          }}
        >
          <CloseIcon size={20} />
        </IconButton>
      </DialogTitle>

      <Divider sx={{ mx: 2, opacity: 0.6 }} />

      <DialogContent sx={{ pt: 3, px: 3 }}>
        <DialogContentText
          sx={{
            textAlign: "center",
            color: "text.secondary",
            mb: 1,
          }}
        >
          Are you sure you want to delete this group?
        </DialogContentText>
        <DialogContentText
          sx={{
            textAlign: "center",
            color: "text.secondary",
            fontSize: "0.875rem",
            opacity: 0.8,
          }}
        >
          This action cannot be undone. All messages and data will be
          permanently removed.
        </DialogContentText>
      </DialogContent>

      <DialogActions
        sx={{
          px: 3,
          py: 2.5,
          justifyContent: "center",
          gap: 2,
        }}
      >
        <Button
          onClick={handleClose}
          variant="outlined"
          sx={{
            borderRadius: 2,
            px: 3,
            py: 1,
            textTransform: "none",
            fontWeight: 500,
            borderWidth: "1.5px",
            "&:hover": {
              borderWidth: "1.5px",
              background: "rgba(0, 0, 0, 0.03)",
            },
          }}
        >
          Cancel
        </Button>

        <Button
          onClick={deleteHandle}
          variant="contained"
          color="error"
          startIcon={<DeleteOutlineIcon size={18} />}
          sx={{
            borderRadius: 2,
            px: 3,
            py: 1,
            textTransform: "none",
            fontWeight: 500,
            boxShadow: "0 4px 12px rgba(211, 47, 47, 0.15)",
            background: `linear-gradient(90deg, ${theme.palette.error.main}, ${theme.palette.error.dark})`,
            "&:hover": {
              boxShadow: "0 6px 15px rgba(211, 47, 47, 0.25)",
              transform: "translateY(-1px)",
            },
            transition: "all 0.3s ease",
          }}
        >
          Delete Group
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ConfirmDeleteDialog;
