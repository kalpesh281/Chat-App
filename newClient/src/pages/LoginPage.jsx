import React, { useState } from "react";
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  Stack,
  Avatar,
  Divider,
  useTheme,
  InputAdornment,
  IconButton,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import PersonIcon from "@mui/icons-material/Person";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import { useInputValidation } from "6pp"; //
import { usernameValidator } from "../utils/validators";

function LoginPage() {
  const theme = useTheme();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  const name = useInputValidation("");
  const username = useInputValidation("", usernameValidator);
  const password = useInputValidation("");
  const bio = useInputValidation("");

  const toggleMode = () => {
    setIsLogin(!isLogin);
  };

  const login = (data) => {
    console.log("Login data:", data);
  };

  const signup = (data) => {
    console.log("Signup data:", data);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (isLogin) {
      login({
        username: username.value,
        password: password.value
      });
    } else {
      signup({
        name: name.value,
        username: username.value,
        password: password.value,
        bio: bio.value
      });
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        minHeight: '100vh',
        width: '100%',
        flexDirection: { xs: 'column', md: 'row' },
        background: `linear-gradient(145deg, #f8f9fa 0%, #f1f3f5 100%)`,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Decorative background elements for entire page */}
      <Box
        sx={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          opacity: 0.4,
          background: 'radial-gradient(circle at 25% 25%, rgba(255,255,255,0.2) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(255,255,255,0.2) 0%, transparent 50%)',
          zIndex: 0,
        }}
      />
        
      {/* Left section - 60% with enhanced design */}
      <Box
        sx={{
          flex: { xs: '1', md: '0.6' },
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          overflow: 'hidden',
          background: 'transparent',
          p: 4,
          zIndex: 1,
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: `radial-gradient(circle at 30% 40%, ${theme.palette.primary.light}10 0%, transparent 70%)`,
            zIndex: -1,
          },
        }}
      >
        {/* Background decorative elements */}
        <Box
          sx={{
            position: 'absolute',
            width: '50%',
            height: '50%',
            borderRadius: '50%',
            background: `linear-gradient(135deg, ${theme.palette.primary.light}20 0%, ${theme.palette.primary.main}10 100%)`,
            filter: 'blur(60px)',
            top: '5%',
            left: '5%',
            zIndex: -1,
            animation: 'pulse 15s infinite ease-in-out',
            '@keyframes pulse': {
              '0%': { transform: 'scale(1) translate(0, 0)' },
              '50%': { transform: 'scale(1.1) translate(5%, 2%)' },
              '100%': { transform: 'scale(1) translate(0, 0)' },
            },
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            width: '35%',
            height: '35%',
            borderRadius: '50%',
            background: `linear-gradient(135deg, ${theme.palette.secondary.light}15 0%, ${theme.palette.secondary.main}10 100%)`,
            filter: 'blur(60px)',
            bottom: '10%',
            right: '10%',
            zIndex: -1,
            animation: 'float 20s infinite ease-in-out',
            '@keyframes float': {
              '0%': { transform: 'translate(0, 0)' },
              '50%': { transform: 'translate(-15%, 10%)' },
              '100%': { transform: 'translate(0, 0)' },
            },
          }}
        />
        
        {/* Decorative patterns */}
        <Box
          sx={{
            position: 'absolute',
            top: 20,
            left: 20,
            width: 200,
            height: 200,
            opacity: 0.4,
            background: `radial-gradient(circle, transparent 20%, ${theme.palette.background.default} 22%, transparent 23%) 0 0, 
                         radial-gradient(circle, transparent 20%, ${theme.palette.background.default} 22%, transparent 23%) 25px 25px`,
            backgroundSize: '50px 50px',
            transform: 'rotate(-5deg)',
            zIndex: -1,
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            bottom: 20,
            right: 20,
            width: 150,
            height: 150,
            opacity: 0.3,
            backgroundImage: `linear-gradient(${theme.palette.primary.light}20 1px, transparent 1px), 
                             linear-gradient(90deg, ${theme.palette.primary.light}20 1px, transparent 1px)`,
            backgroundSize: '20px 20px',
            transform: 'rotate(5deg)',
            zIndex: -1,
          }}
        />
        
        {/* Logo and text container */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            zIndex: 2,
            transform: 'translateY(-5%)',
          }}
        >
          {/* App logo */}
          <Box
            sx={{
              width: 120,
              height: 120,
              borderRadius: '30%',
              background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mb: 4,
              boxShadow: '0 15px 35px rgba(0, 0, 0, 0.1), 0 3px 10px rgba(0, 0, 0, 0.07)',
              position: 'relative',
              overflow: 'hidden',
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-5px)',
                boxShadow: '0 20px 40px rgba(0, 0, 0, 0.12), 0 4px 12px rgba(0, 0, 0, 0.08)',
              },
              '&::before': {
                content: '""',
                position: 'absolute',
                inset: 0,
                borderRadius: '30%',
                padding: '3px',
                background: `linear-gradient(135deg, ${theme.palette.primary.light}, ${theme.palette.secondary.light})`,
                WebkitMask: 
                  'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                WebkitMaskComposite: 'xor',
                maskComposite: 'exclude',
              },
              '&::after': {
                content: '""',
                position: 'absolute',
                top: '-50%',
                left: '-50%',
                width: '200%',
                height: '200%',
                background: 'conic-gradient(transparent, rgba(255, 255, 255, 0.3), transparent 30%)',
                animation: 'rotate 4s linear infinite',
                '@keyframes rotate': {
                  '100%': { transform: 'rotate(1turn)' }
                }
              }
            }}
          >
            <ChatBubbleOutlineIcon sx={{ color: 'white', fontSize: 65, filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))' }} />
          </Box>
          
          {/* App title */}
          <Typography 
            variant="h1" 
            component="h1" 
            fontWeight="bold" 
            sx={{ 
              fontSize: { xs: '3.5rem', md: '5rem' },
              letterSpacing: '-2px',
              mb: 3,
              textAlign: 'center',
              background: `linear-gradient(90deg, ${theme.palette.primary.dark}, ${theme.palette.primary.main} 50%, ${theme.palette.primary.light})`,
              backgroundSize: '200% auto',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textShadow: '0 10px 30px rgba(0, 0, 0, 0.05)',
              animation: 'shine 3s linear infinite',
              '@keyframes shine': {
                'to': { backgroundPosition: '200% center' }
              }
            }}
          >
            Chat App
          </Typography>
          
          {/* App tagline */}
          <Typography
            variant="h5"
            sx={{ 
              textAlign: 'center',
              maxWidth: '450px',
              fontWeight: 500,
              color: theme.palette.text.secondary,
              opacity: 0.9,
              mb: 4,
              lineHeight: 1.5,
            }}
          >
            Connect and chat with friends in real-time
          </Typography>
          
          {/* Feature bullets */}
          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: 2,
              maxWidth: '450px',
            }}
          >
            {['Real-time messaging', 'User friendly', 'Secure chats'].map((feature, i) => (
              <Box
                key={i}
                sx={{
                  bgcolor: 'rgba(255, 255, 255, 0.8)',
                  px: 2,
                  py: 1,
                  borderRadius: 10,
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  color: theme.palette.primary.main,
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
                  border: `1px solid ${theme.palette.primary.light}20`,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1
                }}
              >
                <Box
                  sx={{
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    bgcolor: theme.palette.primary.main,
                  }}
                />
                {feature}
              </Box>
            ))}
          </Box>
        </Box>
      </Box>

      {/* Right section - 40% with clean, simple form */}
      <Box
        sx={{
          flex: { xs: '1', md: '0.4' },
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          p: { xs: 3, md: 4 },
          bgcolor: 'white',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <Paper
          elevation={3}
          sx={{
            p: isLogin ? 4 : 3,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            borderRadius: 2,
            width: '100%',
            maxWidth: 450,
            maxHeight: isLogin ? 'none' : '90vh',
            overflowY: isLogin ? 'visible' : 'auto',
            background: 'white',
            position: 'relative',
            "&:before": {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: "4px",
              background: theme.palette.primary.main,
            },
          }}
        >
          <Avatar
            sx={{
              mb: 2,
              bgcolor: theme.palette.primary.main,
              width: 56,
              height: 56,
            }}
          >
            {isLogin ? (
              <LockOutlinedIcon />
            ) : (
              <PersonAddIcon />
            )}
          </Avatar>

          <Typography
            component="h1"
            variant="h5"
            fontWeight="bold"
            gutterBottom
            color="primary"
          >
            {isLogin ? "Welcome Back" : "Create Account"}
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
            align="center"
            sx={{ mb: 3 }}
          >
            {isLogin
              ? "Sign in to continue to your account"
              : "Fill in your details to get started"}
          </Typography>

          <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
            <Stack spacing={isLogin ? 2 : 1.5}>
              {!isLogin && (
                <TextField
                  label="Name"
                  name="name"
                  variant="outlined"
                  fullWidth
                  required
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PersonIcon color="primary" />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 2,
                      "&:hover .MuiOutlinedInput-notchedOutline": {
                        borderColor: theme.palette.primary.light,
                      },
                    },
                  }}
                  value={name.change}
                  onChange={name.changeHandler}
                />
              )}

              <TextField
                label="Username"
                name="username"
                variant="outlined"
                fullWidth
                value={username.value}
                onChange={username.changeHandler}
                required
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AlternateEmailIcon color="primary" />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 2,
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      borderColor: theme.palette.primary.light,
                    },
                  },
                }}
              />
              {username.error && (
                <Typography 
                  variant="caption" 
                  color="error" 
                  sx={{ ml: 2, display: 'block' }}
                >
                  {username.error}
                </Typography>
              )}
              <TextField
                label="Password"
                name="password"
                type={showPassword ? "text" : "password"}
                variant="outlined"
                fullWidth
                value={password.value}
                onChange={password.changeHandler}
                required
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockOutlinedIcon color="primary" />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                      >
                        {showPassword ? (
                          <VisibilityOffIcon />
                        ) : (
                          <VisibilityIcon />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 2,
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      borderColor: theme.palette.primary.light,
                    },
                  },
                }}
              />

              {!isLogin && (
                <TextField
                  label="Bio"
                  name="bio"
                  variant="outlined"
                  fullWidth
                  value={bio.value}
                  onChange={bio.changeHandler}
                  multiline
                  rows={1}
                  placeholder="Tell us about yourself..."
                  InputProps={{
                    startAdornment: (
                      <InputAdornment
                        position="start"
                        sx={{ alignSelf: "flex-start", mt: 0 }}
                      >
                        <ChatBubbleOutlineIcon color="primary" />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 2,
                      "&:hover .MuiOutlinedInput-notchedOutline": {
                        borderColor: theme.palette.primary.light,
                      },
                    },
                  }}
                />
              )}

              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                size="large"
                sx={{
                  mt: isLogin ? 2 : 1.5,
                  py: isLogin ? 1.5 : 1.2,
                  borderRadius: 2,
                  fontWeight: "bold",
                  textTransform: "none",
                  fontSize: "1rem",
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
                  background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
                  transition: "all 0.3s ease",
                  "&:hover": {
                    boxShadow: "0 6px 15px rgba(0, 0, 0, 0.25)",
                    transform: "translateY(-2px)",
                  },
                }}
              >
                {isLogin ? "Sign In" : "Sign Up"}
              </Button>
              
              <Divider sx={{ my: 1 }}>
                <Typography variant="body2" color="text.secondary" sx={{ px: 1 }}>
                  OR
                </Typography>
              </Divider>

              <Button
                type="button"
                fullWidth
                variant="outlined"
                onClick={toggleMode}
                sx={{
                  py: 1.2,
                  borderRadius: 2,
                  textTransform: "none",
                  fontSize: "0.9rem",
                  borderWidth: "1.5px",
                  transition: "all 0.2s ease",
                  "&:hover": {
                    borderWidth: "1.5px",
                    background: "rgba(0, 0, 0, 0.02)",
                  },
                }}
              >
                {isLogin
                  ? "Don't have an account? Sign Up"
                  : "Already have an account? Sign In"}
              </Button>
            </Stack>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
}

export default LoginPage;
