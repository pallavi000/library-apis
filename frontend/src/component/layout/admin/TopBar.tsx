import React from "react";

// MUI
import {
  AppBar,
  Avatar,
  Badge,
  Box,
  Divider,
  IconButton,
  Stack,
  Toolbar,
} from "@mui/material";

// icons
import { Menu as MenuIcon } from "@mui/icons-material";
import NotificationsIcon from "@mui/icons-material/Notifications";

// component props type
type TopBarProps = {
  handleSideBarOpen: Function;
};

function TopBar({ handleSideBarOpen }: TopBarProps) {
  //   const { theme } = useThemeContext();

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

        {/* <InputBase sx={{ ml: 1, flex: 1 }} placeholder="Search" />
        <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
          <Search />
        </IconButton> */}

        <Box sx={{ flexGrow: 1 }} />
        <Stack
          direction="row"
          alignItems="center"
          spacing={{
            xs: 0.5,
            sm: 1,
          }}
        >
          <IconButton
            disabled
            sx={{
              padding: 0,
              width: 44,
              height: 44,
            }}
          >
            <Avatar sx={{ width: 20, height: 20, padding: 2 }}>$</Avatar>
          </IconButton>
          <IconButton color={"default"} sx={{ width: 48, height: 48 }}>
            <Badge badgeContent={"0"} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          {/* <NotificationsPopover /> */}

          {/* <AccountPopover /> */}
        </Stack>
      </Toolbar>
      <Divider light />
    </AppBar>
  );
}

export default TopBar;
