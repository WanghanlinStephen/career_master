import React, { useState, useEffect } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container,
  useTheme,
  useMediaQuery,
  IconButton,
  Menu,
  MenuItem,
  Avatar
} from '@mui/material';
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';

const Navbar = ({ translations, isAuthenticated, setIsAuthenticated }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [anchorEl, setAnchorEl] = React.useState(null);
  const location = useLocation();
  const [activePath, setActivePath] = useState(location.pathname);
  const navigate = useNavigate();

  useEffect(() => {
    setActivePath(location.pathname);
  }, [location]);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    setIsAuthenticated(false);
    navigate('/');
    handleClose();
  };

  return (
    <AppBar 
      position="fixed" 
      sx={{ 
        background: 'rgba(2, 8, 22, 0.95)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid rgba(255, 107, 53, 0.3)'
      }}
    >
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
          {/* Left side - Logo */}
          <Typography
            variant="h6"
            component={RouterLink}
            to="/"
            sx={{
              fontWeight: 700,
              color: '#FF6B35',
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              '&:hover': {
                color: '#FF6B35',
              }
            }}
          >
            Career Transition King
          </Typography>

          {/* Right side - Start Planning, User Guide and User Menu */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Button
              component={RouterLink}
              to="/editor"
              sx={{
                color: 'rgba(255, 255, 255, 0.9)',
                '&:hover': {
                  backgroundColor: 'rgba(255, 107, 53, 0.1)',
                }
              }}
            >
              Start Planning
            </Button>
            <Button
              component={RouterLink}
              to="/user-guide"
              sx={{
                color: 'rgba(255, 255, 255, 0.9)',
                '&:hover': {
                  backgroundColor: 'rgba(255, 107, 53, 0.1)',
                }
              }}
            >
              User Guide
            </Button>
            {isAuthenticated ? (
              <>
                <IconButton
                  onClick={handleMenu}
                  sx={{
                    color: '#FF6B35',
                    '&:hover': {
                      backgroundColor: 'rgba(255, 107, 53, 0.1)',
                    }
                  }}
                >
                  <Avatar sx={{ bgcolor: '#FF6B35', color: '#020816' }}>
                    {localStorage.getItem('username')?.[0]?.toUpperCase() || 'U'}
                  </Avatar>
                </IconButton>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                  PaperProps={{
                    sx: {
                      backgroundColor: 'rgba(2, 8, 22, 0.95)',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(255, 107, 53, 0.3)',
                    }
                  }}
                >
                  <MenuItem 
                    component={RouterLink} 
                    to="/profile"
                    onClick={handleClose}
                    sx={{
                      color: 'rgba(255, 255, 255, 0.9)',
                      '&:hover': {
                        backgroundColor: 'rgba(255, 107, 53, 0.1)',
                      }
                    }}
                  >
                    Edit Profile
                  </MenuItem>
                  <MenuItem 
                    component={RouterLink} 
                    to="/vip"
                    onClick={handleClose}
                    sx={{
                      color: 'rgba(255, 255, 255, 0.9)',
                      '&:hover': {
                        backgroundColor: 'rgba(255, 107, 53, 0.1)',
                      }
                    }}
                  >
                    VIP Recharge
                  </MenuItem>
                  <MenuItem 
                    onClick={handleLogout}
                    sx={{
                      color: 'rgba(255, 255, 255, 0.9)',
                      '&:hover': {
                        backgroundColor: 'rgba(255, 107, 53, 0.1)',
                      }
                    }}
                  >
                    Logout
                  </MenuItem>
                </Menu>
              </>
            ) : (
              <>
                {/* 登录注册按钮已隐藏 */}
              </>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar; 