
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  Divider,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";

import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { logout } from "../../features/auth/authSlice";
import { removeAuthCookies } from "../../utils/cookieUtils";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { user } = useAppSelector((state) => state.auth);
  const handleProfileClick = (
    event: React.MouseEvent<HTMLElement>
  ) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleMyProfile = () => {
    handleClose();
    navigate("/user/profile");
  };
  const handleLogout = () => {
    handleClose();
    removeAuthCookies();
    dispatch(logout());
    navigate("/login", {
      replace: true,
    });
  };

  const userName = user?.name || "User";
  const userEmail = user?.email || "";

  const avatarLetter = userName
    ? userName.charAt(0).toUpperCase()
    : "U";

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: "#fff",
        color: "#111827",
        borderBottom: "1px solid #e5e7eb",
        boxShadow: "none",
      }}
    >
      <Toolbar
        sx={{
          minHeight: "70px",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontWeight: 700,
            cursor: "pointer",
          }}
          onClick={() => navigate("/")}
        >
          Admin Console
        </Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
          }}
        >
          

         
          <IconButton
            onClick={handleProfileClick}
            sx={{
              p: 0,
            }}
          >
            <Avatar
              sx={{
                width: 42,
                height: 42,
                backgroundColor: "#2563eb",
                fontWeight: 600,
              }}
            >
              {avatarLetter}
            </Avatar>
          </IconButton>

          
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
            slotProps={{
              paper: {
                sx: {
                  mt: 1,
                  width: 250,
                  borderRadius: "12px",
                },
              },
            }}
          >
          
            <Box
              sx={{
                px: 2,
                py: 1.5,
              }}
            >
              <Typography
                sx={{
                  fontWeight: 700,
                }}
              >
                {userName}
              </Typography>

              <Typography
                variant="body2"
                sx={{
                  color: "#6b7280",
                  wordBreak: "break-word",
                }}
              >
                {userEmail}
              </Typography>
            </Box>

            <Divider />

            
            <MenuItem onClick={handleMyProfile}>
              <ListItemIcon>
                <PersonIcon fontSize="small" />
              </ListItemIcon>

              <ListItemText primary="My Profile" />
            </MenuItem>

          
            <MenuItem
              onClick={handleLogout}
              sx={{
                color: "#dc2626",
              }}
            >
              <ListItemIcon>
                <LogoutIcon
                  fontSize="small"
                  sx={{
                    color: "#dc2626",
                  }}
                />
              </ListItemIcon>

              <ListItemText primary="Logout" />
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
