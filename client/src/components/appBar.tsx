import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import MoreIcon from '@mui/icons-material/MoreVert';
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from 'react-router-dom';
import Modal from '@mui/material/Modal';
import { Button } from '@mui/material';
import { SeachInput } from './search';

export default function PrimarySearchAppBar() {
  const auth = useContext(AuthContext)

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const [openModal, setOpenModal] = React.useState(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event: any) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const styleModal = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  const renderMenu = <Menu
    anchorEl={anchorEl}
    anchorOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    id={'primary-search-account-menu'}
    keepMounted
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    open={isMenuOpen}
    onClose={handleMenuClose}
  >
    <MenuItem onClick={handleMenuClose}>
      <Link to="/profile">
        Профиль
      </Link>
    </MenuItem>
    <MenuItem onClick={handleOpenModal}>
      <a>
        Разлогинься
      </a>
    </MenuItem>
  </Menu>


  const renderMobileMenu = <Menu
    anchorEl={mobileMoreAnchorEl}
    anchorOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    id={'primary-search-account-menu-mobile'}
    keepMounted
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    open={isMobileMenuOpen}
    onClose={handleMobileMenuClose}
  >
    <Link to="/chat">
      <MenuItem>
        <IconButton size="large" color="inherit">
          <Badge badgeContent={'❤'} color="error">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
    </Link>
    <MenuItem onClick={handleProfileMenuOpen}>
      <IconButton
        size="large"
        aria-label="account of current user"
        aria-controls="primary-search-account-menu"
        aria-haspopup="true"
        color="inherit"
      >
        <AccountCircle />
      </IconButton>
      <p>Profile</p>
    </MenuItem>
  </Menu>

  return (
    <div>
      <header className='flex items-center  fixed w-full z-30' style={{ backgroundColor: '#262626' }}>
        <Toolbar className='w-full max-w-screen-xl mx-auto'>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: 'none', sm: 'block', color: '#fff4f9' } }}
          >
            Odnogryppniki
          </Typography>
          <SeachInput />
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <Link to="/chat">
              <IconButton size="large" color="primary">
                <Badge badgeContent={'❤'} color="error">
                  <MailIcon />
                </Badge>
              </IconButton>
            </Link>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={'primary-search-account-menu'}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="primary"
            >
              <AccountCircle />
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={'primary-search-account-menu-mobile'}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="primary"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </header>
      {renderMobileMenu}
      {renderMenu}
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={styleModal}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Точно разлогиниться хочешь?
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Если ты разлогинишься и больше не зайдешь, разработчики одногруппников расстроятся...
          </Typography>
          <div className='flex justify-between pt-5'>
            <Button
              onClick={handleCloseModal}
              variant="contained" color='primary'>
              Остаться
            </Button>
            <Button
              onClick={auth.logout}
              variant="outlined" color="error">
              Выйти
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}