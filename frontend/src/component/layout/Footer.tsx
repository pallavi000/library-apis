import React from "react";

// MUI
import { Box, Grid, IconButton, Typography } from "@mui/material";

// icons
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import YouTubeIcon from "@mui/icons-material/YouTube";

function Footer() {
  return (
    <>
      <Grid
        container
        spacing={3}
        columns={12}
        bgcolor={"background.neutral"}
        color="text.primary"
        justifyContent="space-between"
        padding={"2rem 2rem"}
        marginTop={"4rem"}
      >
        <Grid item xs={12} sm={12} md={6}>
          <Grid
            container
            spacing={3}
            columns={12}
            justifyContent="space-between"
          >
            <Grid item xs={12} sm={4} md={4}>
              <Typography variant="h6" gutterBottom>
                Company
              </Typography>
              <Typography variant="body1">About Us</Typography>
              <Typography variant="body1">Blog</Typography>
              <Typography variant="body1">Career</Typography>
              <Typography variant="body1">Press</Typography>
            </Grid>
            <Grid item xs={12} sm={4} md={4}>
              <Typography variant="h6" gutterBottom>
                Help & Support
              </Typography>
              <Typography variant="body1">Contact Us</Typography>
              <Typography variant="body1">Knowledge Center</Typography>
              <Typography variant="body1">FAQ</Typography>
            </Grid>
            <Grid item xs={12} sm={4} md={4}>
              <Typography variant="h6" gutterBottom>
                Legal
              </Typography>
              <Typography variant="body1">Terms & Conditions</Typography>
              <Typography variant="body1">Privacy Policy</Typography>
              <Typography variant="body1">Security</Typography>
              <Typography variant="body1">Licences</Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
              alignItems: { sm: "center", md: "flex-end" },
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: "1rem" }}>
              <IconButton color="inherit">
                <FacebookIcon />
              </IconButton>
              <IconButton color="inherit">
                <InstagramIcon />
              </IconButton>
              <IconButton color="inherit">
                <TwitterIcon />
              </IconButton>
              <IconButton color="inherit">
                <YouTubeIcon />
              </IconButton>
            </Box>
            <Box sx={{ display: "flex", gap: "1rem", alignItems: "center" }}>
              <LocationOnOutlinedIcon />{" "}
              <Typography variant="h6">Helsinki, Finland</Typography>
            </Box>
            <Box>
              <Typography>
                © {new Date().getFullYear()} | Library Management System
              </Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </>
  );
}

export default Footer;
