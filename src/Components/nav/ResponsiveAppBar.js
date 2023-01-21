import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import { UserAuth } from '../../Contexts/AuthContext';
import UserAuthDialog from "../dialogs/UserAuthDialog";
import { Snackbar } from '@mui/material';

const pages = ["Home", "Projects", "Tasks"];
const settings = ['Profile', 'Account', 'Settings'];
const UserAuthActions = ["Sign up", "Log in"];

const ResponsiveAppBar = (props) => {
  const { user, logout } = UserAuth();
  const navigate = useNavigate();
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [openUserAuthDialog, setOpenUserAuthDialog] = useState(false);
  const [type, setType] = useState("");
  const { snackbarOpen, setSnackbarOpen } = props;

  // UserAuthDialog functions

  const handleUserAuthDialogClickOpen = () => {
    setOpenUserAuthDialog(true);
  };

  const handleLoginSignupToggle = () => {
    (type === "Sign up") ? setType(UserAuthActions[1]) : setType(UserAuthActions[0]);
  }

  // Appbar nav handlers
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  // Closes user menu on nav then selects dialog or logout based on choice
  const handleCloseUserMenu = async (action) => {
    setAnchorElUser(null);
    // Switch opens proper dialog based on choice or logs out
    switch (action) {
      case "Sign up":
        setType(action);
        handleUserAuthDialogClickOpen();
        break;
      case "Log in":
        setType(action);
        handleUserAuthDialogClickOpen();
        break;
      case "Logout":
        try {
          await logout();
          navigate("/");
        } catch (e) {
          console.log("Logout error: ", e.message);
        }
        break;
      default: 
        return
    }
  };

  return (
    <>
      <AppBar position="static">
        <Container maxWidth="md">
          <Toolbar disableGutters>
            <TaskAltIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              TaskFlow
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: 'block', md: 'none' },
                }}
              >
                {pages.map((page) => (
                  <MenuItem key={page} onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">
                      <Link style={{textDecoration: "none", color: "#000000DE"}} to={`/${page}`}>
                        {page}
                      </Link>
                    </Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            <TaskAltIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
            <Typography
              variant="h5"
              noWrap
              component="a"
              href=""
              sx={{
                mr: 2,
                display: { xs: 'flex', md: 'none' },
                flexGrow: 1,
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              TaskFlow
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              {pages.map((page) => (
                <Button
                  key={page}
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: 'white', display: 'block' }}
                >
                  <Link style={{textDecoration: "none", color: "white"}} to={`/${page}`}>
                    {page}
                  </Link>
                </Button>
              ))}
            </Box>
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  {(user?.uid) ? (
                    <Avatar alt={user?.email.toUpperCase()} src="/static/images/avatar/2.jpg" />
                  ) : (
                    <Avatar />
                  )}
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {(user?.uid) ? (
                  <div>
                    {settings.map((setting) => (
                      <MenuItem key={setting} onClick={handleCloseUserMenu}>
                        <Typography textAlign="center">
                          <Link style={{textDecoration: "none", color: "#000000DE"}} to={`/${setting}`}>
                            {setting}
                          </Link>
                        </Typography>
                      </MenuItem>
                    ))}
                    <MenuItem onClick={() => handleCloseUserMenu("Logout")}>
                      <Typography textAlign="center">Logout</Typography>
                    </MenuItem>
                  </div>
                ) : (
                  <div>
                    {UserAuthActions.map((action) => (
                      <MenuItem key={action} onClick={(e) => handleCloseUserMenu(action)}>
                        <Typography textAlign="center">
                          {action}
                        </Typography>
                      </MenuItem>
                    ))}
                  </div>
                )}
              </Menu>
              <UserAuthDialog
                type={type}
                open={openUserAuthDialog}
                setOpen={setOpenUserAuthDialog}
                toggleLoginSignup={handleLoginSignupToggle}
              />
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Snackbar(s) */}
      <Snackbar 
        open={snackbarOpen}
        autoHideDuration={6000}
        message="You need to be logged in to access this page."
        onClose={() => setSnackbarOpen(false)}
      />
    </>
  );
}
export default ResponsiveAppBar;