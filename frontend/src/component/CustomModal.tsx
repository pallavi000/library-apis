import React, { ReactNode } from "react";

// MUI
import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
} from "@mui/material";

//icons
import CloseIcon from "@mui/icons-material/Close";

type CustomModalProps = {
  title: string;
  isOpen: boolean;
  onClose: () => void;
  component: ReactNode;
  buttonComponent: ReactNode;
  maxWidth: "sm" | "md" | "lg" | "xl";
};

function CustomModal({
  title,
  isOpen,
  onClose,
  component,
  buttonComponent,
  maxWidth = "sm",
}: CustomModalProps) {
  return (
    <React.Fragment>
      <Dialog
        fullWidth
        maxWidth={maxWidth}
        open={isOpen}
        onClose={() => onClose()}
      >
        <DialogTitle>{title}</DialogTitle>
        <IconButton
          aria-label="close"
          onClick={() => onClose()}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>

        <DialogContent dividers>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "2rem",
              padding: "1rem 0rem",
              paddingTop: 0,
            }}
          >
            {component}
          </Box>
        </DialogContent>
        <DialogActions>{buttonComponent}</DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

export default CustomModal;
