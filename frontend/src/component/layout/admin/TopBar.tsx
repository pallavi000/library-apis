import React from "react";

// MUI
import {
  AppBar,
  Avatar,
  Badge,
  Box,
  Divider,
  IconButton,
  InputBase,
  Menu,
  MenuItem,
  Stack,
  Toolbar,
  Tooltip,
} from "@mui/material";

// icons
import { Menu as MenuIcon, Search } from "@mui/icons-material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { useGlobalContext } from "../../../context/GlobalContext";
import { useNavigate } from "react-router-dom";
// icons
import LogoutIcon from "@mui/icons-material/Logout";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

// component props type
type TopBarProps = {
  handleSideBarOpen: Function;
};

function TopBar({ handleSideBarOpen }: TopBarProps) {
  //   const { theme } = useThemeContext();
  const navigate = useNavigate();
  const { user, logout } = useGlobalContext();

  // user profile icon click popover state
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  // handle user profile/icon click popover
  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  // logout handler
  const logoutUser = () => {
    handleClose();
    logout();
  };

  return (
    <AppBar
      sx={{
        boxShadow: "none",
        backgroundColor: "background.default",
        color: "text.primary",
      }}
    >
      <Toolbar>
        <IconButton
          onClick={() => handleSideBarOpen()}
          sx={{
            mr: 1,
            color: "text.primary",
            display: { lg: "none" },
          }}
        >
          <MenuIcon />
        </IconButton>

        <Box sx={{ flexGrow: 1 }} />
        <Stack
          direction="row"
          alignItems="center"
          spacing={{
            xs: 0.5,
            sm: 1,
          }}
        >
          <Tooltip title={user?.name}>
            <IconButton onClick={handleMenu}>
              <Avatar
                alt={user?.name}
                src={user?.avatar}
                sx={{ width: 32, height: 32 }}
              />
            </IconButton>
          </Tooltip>

          <IconButton color={"default"} sx={{ width: 48, height: 48 }}>
            <Badge badgeContent={"0"} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>

          <Menu
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
            PaperProps={{
              sx: {
                mt: 2.2,
                ml: 0.75,
                width: 200,
              },
            }}
          >
            <MenuItem onClick={logoutUser}>
              <LogoutIcon sx={{ marginRight: "0.5rem" }} /> Logout
            </MenuItem>
          </Menu>
        </Stack>
      </Toolbar>
      <Divider light />
    </AppBar>
  );
}

export default TopBar;
