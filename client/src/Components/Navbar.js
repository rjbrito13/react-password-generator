import React, { useState } from "react";
import { Link } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import VpnKeyOutlinedIcon from "@mui/icons-material/VpnKeyOutlined";
import MenuIcon from "@mui/icons-material/Menu";
import Box from "@mui/material/Box";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import "./Navbar.css";

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const hideMenu = () => {
    setShowMenu(false);
  };

  return (
    <AppBar position="sticky">
      <Toolbar>
        {/* Render menu icon based on screen size */}
        {isMobile ? (
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={toggleMenu}
          >
            <div
              className="show-menu"
              onClick={hideMenu}
              style={{ visibility: !showMenu ? "visible" : "hidden" }}
            >
              <MenuIcon />
            </div>
          </IconButton>
        ) : (
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="logo"
          >
            <VpnKeyOutlinedIcon />
          </IconButton>
        )}

        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          {/* Render menu links or burger menu based on screen size and showMenu state */}
          {isMobile && showMenu ? (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: "100vh", // 100% of the viewport height
                gap: 2,
              }}
            >
              <Button
                component={Link}
                to="/"
                color="inherit"
                onClick={hideMenu}
              >
                Home
              </Button>

              <Button
                component={Link}
                to="/password-manager"
                color="inherit"
                onClick={hideMenu}
              >
                Password Generator
              </Button>

              <Button
                component={Link}
                to="/password-vault"
                color="inherit"
                onClick={hideMenu}
              >
                Password Vault
              </Button>
            </Box>
          ) : (
            !isMobile && (
              <>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 2,
                  }}
                >
                  <Button component={Link} to="/" color="inherit">
                    Home
                  </Button>
                  <Button
                    component={Link}
                    to="/password-manager"
                    color="inherit"
                  >
                    Password Generator
                  </Button>

                  <Button
                    component={Link}
                    to="/password-vault"
                    color="inherit"
                    onClick={hideMenu}
                  >
                    Password Vault
                  </Button>
                </Box>
              </>
            )
          )}
        </Typography>
        {isMobile && showMenu ? (
          <div style={{ visibility: !showMenu ? "visible" : "hidden" }}>
            <Button color="inherit" component={Link} to="/loginpage">
              Login Mobile
            </Button>
          </div>
        ) : (
          <>
            <Button color="inherit" component={Link} to="/loginpage">
              Login
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
