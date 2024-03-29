import React from "react";
import { NavLink } from "react-router-dom";

// MUI
import { ListItemButton, ListItemIcon, ListItemText } from "@mui/material";

//types
import { SidebarItem } from "../../../@types/sidebar";

//hooks

//component props type
type SideBarItemProps = {
  item: SidebarItem;
};

function SideBarItem({ item }: SideBarItemProps) {
  // permission

  return (
    <ListItemButton
      component={NavLink}
      to={item.path}
      sx={{
        height: 48,
        position: "relative",
        textTransform: "capitalize",
        color: "text.secondary",
        borderRadius: 4,
        "&.active": {
          color: "text.primary",
          bgcolor: "action.selected",
          fontWeight: "bold",
        },
      }}
    >
      <ListItemIcon>{item.icon}</ListItemIcon>
      <ListItemText disableTypography primary={item.title} />
    </ListItemButton>
  );
}

export default SideBarItem;
