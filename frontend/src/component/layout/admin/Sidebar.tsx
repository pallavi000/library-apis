// MUI
import {
  Avatar,
  Box,
  Drawer,
  Link,
  List,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";

// icons
import {
  AccountCircle,
  Category,
  Dashboard,
  Money,
  ShoppingBag,
  DeveloperMode,
  Straighten,
  Settings,
} from "@mui/icons-material";

// components
import SideBarItem from "./SidebarItems";

// types
import { SidebarItem } from "../../../@types/sidebar";
import { ADMIN_SIDEBAR_WIDTH } from "../../../constants/common";
import { useGlobalContext } from "../../../context/GlobalContext";

// context

// utils

// sidebar menus
const sidebarItems: SidebarItem[] = [
  {
    title: "Dashboard",
    path: "/admin/dashboard",
    icon: <Dashboard />,
  },
  {
    title: "Users",
    path: "/admin/users",
    icon: <AccountCircle />,
  },
  {
    title: "Membership",
    path: "/admin/membership",
    icon: <AccountCircle />,
  },
  {
    title: "Books",
    path: "/admin/books",
    icon: <DeveloperMode />,
  },
  {
    title: "Authors",
    path: "/admin/authors",
    icon: <Category />,
  },
  {
    title: "Genres",
    path: "/admin/genres",
    icon: <Category />,
  },
  {
    title: "Borrows",
    path: "/admin/borrows",
    icon: <ShoppingBag />,
  },
];

type SideBarProps = {
  isOpen: boolean;
  handleClose: Function;
};
function SideBar({ isOpen, handleClose }: SideBarProps) {
  const theme = useTheme();
  const { user } = useGlobalContext();
  // sidebar content
  const renderContent = (
    <Box
      sx={{
        height: 1,
        "& .simplebar-content": {
          height: 1,
          display: "flex",
          flexDirection: "column",
        },
      }}
    >
      <Box
        sx={{
          px: 2.5,
          py: 3,
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
        }}
      >
        <Avatar
          alt={user?.name}
          src={user?.avatar}
          variant={"square"}
          sx={{ width: 48, height: 48 }}
        />
        <Box>
          <Typography variant="h6" color={"primary"}>
            Library Management System
          </Typography>
        </Box>
      </Box>

      <Box sx={{ mb: 3, mx: 2.5 }}>
        <Link underline="none">
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              padding: "0.8rem 2rem",
              borderRadius: 1.5,
              backgroundColor: "action.selected",
            }}
          >
            <Avatar src={"Ram"} alt="photoURL" />

            <Box sx={{ ml: 2 }}>
              <Typography variant="subtitle2" sx={{ color: "text.primary" }}>
                {user?.name}
              </Typography>

              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                Admin
              </Typography>
            </Box>
          </Box>
        </Link>
      </Box>

      <Box>
        <List disablePadding sx={{ p: 1 }}>
          {sidebarItems.map((item) => (
            <SideBarItem key={item.path} item={item} />
          ))}
        </List>
      </Box>
      <Box sx={{ flexGrow: 1 }} />
    </Box>
  );

  const isDesktop = useMediaQuery(theme.breakpoints.up("lg"));

  return (
    <Box
      component="nav"
      sx={{
        flexShrink: { lg: 0 },
        width: { lg: ADMIN_SIDEBAR_WIDTH },
      }}
    >
      {isDesktop ? (
        <Drawer
          open
          variant="permanent"
          PaperProps={{
            sx: {
              width: ADMIN_SIDEBAR_WIDTH,
              bgcolor: "background.default",
              borderRightStyle: "dashed",
            },
          }}
        >
          {renderContent}
        </Drawer>
      ) : (
        <Drawer
          variant="temporary"
          open={isOpen}
          onClose={() => handleClose()}
          ModalProps={{
            keepMounted: true,
          }}
          PaperProps={{
            sx: {
              width: ADMIN_SIDEBAR_WIDTH,
            },
          }}
        >
          {renderContent}
        </Drawer>
      )}
    </Box>
  );
}

export default SideBar;
