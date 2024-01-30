import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import {
  AppBar,
  Avatar,
  Box,
  Container,
  Menu,
  MenuItem,
  Stack,
  Tooltip,
} from "@mui/material";
import AdbIcon from "@mui/icons-material/Adb";
import { useGlobalContext } from "../../context/GlobalContext";

// icons
import LogoutIcon from "@mui/icons-material/Logout";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import React from "react";

function Header() {
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
    <AppBar position="static" sx={{ marginBottom: 2 }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ justifyContent: "space-between" }}>
          <Stack direction={"row"} alignItems={"center"}>
            <AdbIcon sx={{ mr: 1, ml: { xs: 2, lg: 0 } }} />
            <Typography
              variant="h6"
              noWrap
              component="a"
              sx={{
                mr: 2,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              Logo
            </Typography>
          </Stack>
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            {/* <CustomSearch /> */}
          </Box>

          <Box>
            {user ? (
              <>
                <Tooltip title={user.name}>
                  <IconButton onClick={handleMenu}>
                    <Avatar alt={user.name} src={user.avatar} />
                  </IconButton>
                </Tooltip>
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
                  <MenuItem
                    onClick={() => {
                      handleClose();
                    }}
                    sx={{ minWidth: 180 }}
                  >
                    <AccountCircleIcon sx={{ marginRight: "0.5rem" }} /> Profile
                  </MenuItem>
                  <MenuItem onClick={logoutUser}>
                    <LogoutIcon sx={{ marginRight: "0.5rem" }} /> Logout
                  </MenuItem>
                </Menu>
              </>
            ) : (
              <>
                <Button
                  type="a"
                  variant="contained"
                  size="small"
                  sx={{ marginRight: "8px" }}
                  href="/sign-in"
                >
                  Login
                </Button>
                <Button
                  variant="contained"
                  color="success"
                  size="small"
                  type="a"
                  href="/sign-up"
                >
                  Sign up
                </Button>
              </>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Header;
