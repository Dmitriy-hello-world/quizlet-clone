import { NavLink, Link } from 'react-router-dom';

import { useState, FC } from 'react';
import { AppBar, Box, Toolbar, IconButton, Typography, Menu, Container, Button, MenuItem } from '@mui/material';

import MenuIcon from '@mui/icons-material/Menu';

import AccountInHeader from '../features/user/AccountInHeader.tsx';

import SearchModules from './Search';

const pages = [
  { page: 'Home', link: '/' },
  { page: 'Personal Lib', link: '/personal' },
];

const Header: FC = () => {
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="span"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.1rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            <Link style={{ textDecoration: 'none', color: 'white' }} to="/">
              HC
            </Link>
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
                <MenuItem key={page.page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">
                    <NavLink
                      style={({ isActive }) => ({
                        color: isActive ? 'blue' : 'grey',
                        textDecoration: 'none',
                      })}
                      to={page.link}
                    >
                      {page.page}
                    </NavLink>
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Typography
            variant="h5"
            noWrap
            component="span"
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
            <Link style={{ textDecoration: 'none', color: 'white' }} to="/">
              HC
            </Link>
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button onClick={handleCloseNavMenu} key={page.page} sx={{ my: 2, color: 'white', display: 'block' }}>
                <NavLink
                  style={({ isActive }) => ({
                    color: isActive ? 'black' : 'white',
                    textDecoration: 'none',
                  })}
                  to={page.link}
                >
                  {page.page}
                </NavLink>
              </Button>
            ))}
          </Box>
          <SearchModules />
          <AccountInHeader />
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
