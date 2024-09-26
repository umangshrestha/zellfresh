import { Outlet } from "react-router-dom";
import Account from "../Account";
import Notification from "../Notification";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import MenuOpen from "@mui/icons-material/MenuOpen";
import Link from "@mui/material/Link";
import React, { useState } from "react";

import Paper from "@mui/material/Paper";
import ThemeToggle from "../ThemeToggle";
import Footer from "../Footer";
import { APP_NAME } from "../../config";

export const Layout = () => {
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const MenuButton = !anchorElNav ? (
    <IconButton
      aria-label="close menu"
      edge="start"
      color="inherit"
      onClick={() => setAnchorElNav(null)}
      sx={{ mr: 2 }}
    >
      <MenuOpen />
    </IconButton>
  ) : (
    <IconButton
      aria-label="open menu"
      edge="start"
      color="inherit"
      onClick={handleOpenNavMenu}
      sx={{ mr: 2 }}
    >
      <MenuIcon />
    </IconButton>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar disableGutters>
          {MenuButton}
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link href="/" color="inherit" underline="none">
              {APP_NAME}
            </Link>
          </Typography>
          <ThemeToggle />
          <Account />
        </Toolbar>
      </AppBar>
      <Paper className="min-h-screen">
        <Outlet />
        <Notification />
      </Paper>
      <Footer />
    </Box>
  );
};
