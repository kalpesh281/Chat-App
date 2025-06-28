import {
  Dialog,
  InputAdornment,
  List,
  Stack,
  TextField,
  IconButton,
  Box,
  Typography,
  Divider,
  Paper,
} from "@mui/material";
import {
  Search as SearchIcon,
  Close as CloseIcon,
  PersonAdd as PersonAddIcon,
} from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import { useInputValidation } from "6pp";
import UserList from "../shared/UserList";
import { useDispatch } from "react-redux";
import { setIsSearch } from "../../redux/reducers/miscSlice";
import { useLazySearchUserQuery } from "../../redux/api/api";

function Search({ onClose }) {
  const [users, setUsers] = useState([]);
  const dispatch = useDispatch();

  const [searchUser] = useLazySearchUserQuery();

  const search = useInputValidation("");

  const handleClose = () => dispatch(setIsSearch(false));

  useEffect(() => {
    const timeOutId = setTimeout(() => {
      searchUser(search.value)
        .then(({ data }) => {
          console.log("Search results:", data);
          if (Array.isArray(data?.users)) setUsers(data.users);
          else setUsers([]);
        })
        .catch((error) => {
          console.error("Error fetching search results:", error);
          setUsers([]);
        });
    }, 1000);
    return () => clearTimeout(timeOutId);
  }, [search.value]);

  let isLoadingSendFriendRequest = false;

  const addFriendHandler = (id) => {
    console.log("Add friend handler called with id:", id);
  };

  return (
    <Dialog
      open
      onClose={handleClose}
      PaperProps={{
        sx: {
          borderRadius: 2,
          overflow: "hidden",
          width: { xs: "95%", sm: "450px" },
          maxWidth: "450px",
          boxShadow: "0 8px 40px rgba(0,0,0,0.12)",
        },
      }}
    >
      <Box
        sx={{
          background: "linear-gradient(135deg, #0a2e63 0%, #1976d2 100%)",
          py: 1.5,
          px: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography
          variant="h6"
          color="white"
          sx={{
            fontWeight: 500,
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          <SearchIcon fontSize="small" />
          Find People
        </Typography>

        <IconButton
          size="small"
          onClick={handleClose}
          sx={{
            color: "white",
            backgroundColor: "rgba(255,255,255,0.1)",
            "&:hover": {
              backgroundColor: "rgba(255,255,255,0.2)",
            },
          }}
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      </Box>

      <Stack p={2} spacing={2}>
        <TextField
          placeholder="Search by name or username..."
          value={search.value}
          onChange={search.changeHandler}
          variant="outlined"
          fullWidth
          autoFocus
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon color="primary" />
              </InputAdornment>
            ),
            sx: {
              borderRadius: 2,
              bgcolor: "rgba(0,0,0,0.02)",
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "rgba(0,0,0,0.1)",
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "primary.main",
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "primary.main",
              },
            },
          }}
        />

        {users.length > 0 ? (
          <>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ pl: 1, fontWeight: 500 }}
            >
              {users.length} results found
            </Typography>

            <Divider sx={{ opacity: 0.6 }} />

            <List
              sx={{
                maxHeight: 350,
                overflow: "auto",
                mt: 1,
                px: 1,
                "&::-webkit-scrollbar": {
                  width: "5px",
                },
                "&::-webkit-scrollbar-thumb": {
                  backgroundColor: "rgba(0,0,0,0.1)",
                  borderRadius: "10px",
                },
              }}
            >
              {users.map((user) => (
                <Paper
                  key={user._id}
                  elevation={0}
                  sx={{
                    mb: 1,
                    borderRadius: 2,
                    overflow: "hidden",
                    transition: "all 0.2s",
                    backgroundColor: "rgba(0,0,0,0.01)",
                    "&:hover": {
                      backgroundColor: "rgba(25, 118, 210, 0.08)",
                      transform: "translateY(-2px)",
                      boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                    },
                  }}
                >
                  <UserList
                    key={user._id}
                    user={user}
                    handler={addFriendHandler}
                    handlerIsLoading={isLoadingSendFriendRequest}
                  />
                </Paper>
              ))}
            </List>
          </>
        ) : (
          <Box
            sx={{
              py: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              color: "text.secondary",
            }}
          >
            <SearchIcon sx={{ fontSize: 40, opacity: 0.3, mb: 1 }} />
            <Typography>No users found</Typography>
          </Box>
        )}
      </Stack>
    </Dialog>
  );
}

export default Search;
