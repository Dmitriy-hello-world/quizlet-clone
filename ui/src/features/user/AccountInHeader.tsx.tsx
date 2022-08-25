import { FC, useState, Fragment, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { Box, Avatar, Menu, MenuItem, ListItemIcon, Divider, IconButton, Typography, Tooltip } from '@mui/material';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';

import { useAppDispatch } from '../../store/store';

import { loadUser, getUserInfoSelector } from './userSlice';

const AccountInHeader: FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const dispatch = useAppDispatch();
  const { user, status, error } = useSelector(getUserInfoSelector);

  const callUseEffectOnce = useRef(true);
  useEffect(() => {
    if (callUseEffectOnce.current) {
      callUseEffectOnce.current = false;
      dispatch(loadUser());
    }
  }, [dispatch]);

  const isAuthorized = true;

  return (
    <Fragment>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
        <Typography sx={{ minWidth: 100, cursor: 'pointer', m: '0 5px' }}>
          {user.firstName !== null && isAuthorized ? user.firstName : 'log in'}
        </Typography>
        <Tooltip title="Account">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <Avatar sx={{ width: 32, height: 32 }}>
              {user.firstName !== null && isAuthorized ? user.firstName[0] : 'L'}
            </Avatar>
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem key="0">
          <Avatar />{' '}
          {user.firstName !== null && user.secondName !== null && isAuthorized
            ? `${user.firstName} ${user.secondName}`
            : 'profile'}
        </MenuItem>
        <Divider />
        {isAuthorized ? (
          [
            <MenuItem key="1">
              <ListItemIcon>
                <Settings fontSize="small" />
              </ListItemIcon>
              Settings
            </MenuItem>,
            <MenuItem key="2">
              <ListItemIcon>
                <Logout fontSize="small" />
              </ListItemIcon>
              Logout
            </MenuItem>,
          ]
        ) : (
          <MenuItem key="3">Log in</MenuItem>
        )}
      </Menu>
    </Fragment>
  );
};

export default AccountInHeader;