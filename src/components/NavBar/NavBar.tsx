import { useEffect, useState } from 'react';
import {
  AppBar,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Typography,
  Toolbar,
  Container,
  Button,
  Tooltip,
  Avatar,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import {
  Home as HomeIcon,
  Dashboard as DashboardIcon,
  Assignment as AssignmentIcon,
  BarChart as BarChartIcon,
  NotificationsNone as NotificationsNoneIcon,
  LiveHelp as LiveHelpIcon,
  Settings as SettingsIcon,
  AccountCircle as AccountCircleIcon,
  ShoppingCartOutlined as ShoppingCartOutlinedIcon,
  Adb as AdbIcon, 
} from '@mui/icons-material';
import AddIcon from '@mui/icons-material/Add';
import { FavoriteBorder } from '@mui/icons-material'; 

import { Link, useNavigate } from 'react-router-dom';
import CategoriesDrawer from '../CategoriesDrawer';
import { useUser } from '../../hooks';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

const drawerWidth = 300;
const ResponsiveAppBar = () => {
  const userId = useSelector((state: RootState) => state.auth.userId);
  const userType = useSelector((state: RootState) => state.auth.userType);
    const menuItems = [
      { name: 'Home', link: '/', icon: <HomeIcon /> },
      { name: 'Add new artpiece', link: '/addartwork', icon: <DashboardIcon /> },
      { name: 'Users', link: '/userlist', icon: <AssignmentIcon /> },
      { name: 'Add new category', link: '/createcategories', icon: <BarChartIcon /> },    ];
  useEffect(() => {
    console.log('Current userId:', userId);
  }, [userId]);
  const { data: user } = useUser(userId); 

  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [isCategoriesDrawerOpen, setCategoriesDrawerOpen] = useState(false);
  const navigate = useNavigate();

  const handleLoginClick = () => {
    console.log('Login button clicked');
    navigate('/login');
  };

  const handleDrawerToggle = () => {
    setDrawerOpen(!isDrawerOpen);
  };

  const handleUserClick = () => {
    navigate('/userprofile');
  };

  const handleCartClick = () => {
    navigate('/cart');
  };

  const handleCategoriesDrawerToggle = (open: boolean | ((prevState: boolean) => boolean)) => () => {
    setCategoriesDrawerOpen(open);
  };

  const handleAddClick = () => {
    navigate('/addartwork');   
    
  };
  const handleWishlistClick = () => {
    navigate('/wishlist');   
    
  };

  const handleNotificationsClick = () => {
    navigate('/notifications'); 
  };

  const drawerContent = (
    <Box
      sx={{ width: drawerWidth }}
      role="presentation"
      onClick={() => setDrawerOpen(false)}
      onKeyDown={() => setDrawerOpen(false)}
    >
      <List>
      {menuItems.map((item, index) => (
        <ListItem button component={Link} to={item.link} key={index}>
          <ListItemIcon>{item.icon}</ListItemIcon>
          <ListItemText primary={item.name} />
        </ListItem>
      ))}
    </List>
      <List>
        {['Notifications', 'About Us', 'Support'].map((text, index) => (
          <ListItem button key={text} onClick={text === 'Notifications' ? handleNotificationsClick : undefined}>
            <ListItemIcon>
              {index === 0 ? (
               
                  <NotificationsNoneIcon />
                
              ) : index === 1 ? <LiveHelpIcon /> : <SettingsIcon />}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      {user && (
        <Box sx={{ p: 2, mt: 'auto' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Avatar sx={{ bgcolor: 'secondary.main', width: 32, height: 32 }}>{user.username?.charAt(0).toUpperCase()}</Avatar>
            <Box sx={{ ml: 2 }}>
              <Typography variant="subtitle2">{user.username}</Typography>
              <Typography variant="caption">{user.email}</Typography>
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar position="fixed">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
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
              LOGO
            </Typography>
            <Tooltip title="Choose category">
              <Button sx={{ my: 2, color: 'white', display: 'block' }} onClick={handleCategoriesDrawerToggle(true)}>
                Categories
              </Button>
            </Tooltip>
            {userType === 'REGISTERED' && (
            <Tooltip title="Add new item">
              <Button sx={{ my: 2, color: 'white', display: 'block', ml: 2 }} onClick={handleAddClick}>
                <AddIcon />
              </Button>
            </Tooltip>
            )}
            <Box sx={{ flexGrow: 1 }} />
            {(userType === 'ADMIN' || userType === 'REGISTERED') && (              
            <Tooltip title="Wishlist">
            <IconButton
              size="large"
              aria-label="open wishlist"
              onClick={handleWishlistClick}
              color="inherit"
            >
               <FavoriteBorder />
            </IconButton>
          </Tooltip>
            )}
            {(userType === 'ADMIN' || userType === 'REGISTERED') && (
              <>
                <Tooltip title="Open cart">
                  <Button color="inherit" startIcon={<ShoppingCartOutlinedIcon />} onClick={handleCartClick} />
                </Tooltip>
                <Tooltip title="Profile">
                  <IconButton
                    size="large"
                    edge="end"
                    aria-label="account of current user"
                    onClick={handleUserClick}
                    color="inherit"
                  >
                    <AccountCircleIcon />
                  </IconButton>
                </Tooltip>
              </>
            )}
          
            {!(userType === 'ADMIN' || userType === 'REGISTERED') && (              
            <Tooltip title="Log into your account">
                <Button color="inherit" onClick={handleLoginClick}>Login</Button>
              </Tooltip>
            )}
            {userType === 'ADMIN' && (
              <Tooltip title="Open settings">
                <IconButton
                  size="large"
                  edge="end"
                  aria-label="open drawer"
                  onClick={handleDrawerToggle}
                  color="inherit"
                >
                  <MenuIcon />
                </IconButton>
              </Tooltip>
            )}
          </Toolbar>
        </Container>
      </AppBar>
      {userType === 'ADMIN' && (
        <Drawer
          anchor="right"
          open={isDrawerOpen}
          onClose={handleDrawerToggle}
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': { width: drawerWidth, boxSizing: 'border-box' },
          }}
        >
          {drawerContent}
        </Drawer>
      )}
      <CategoriesDrawer isDrawerOpen={isCategoriesDrawerOpen} toggleDrawer={handleCategoriesDrawerToggle} />
      <Toolbar />
    </Box>
  );
};

export default ResponsiveAppBar;