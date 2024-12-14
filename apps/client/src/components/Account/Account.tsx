import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import React, { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useAccount } from './Account.hooks.ts';

export const Account = () => {
  const { logout, accountDetails } = useAccount();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const isGuest = accountDetails?.role === 'guest';
  const isAdmin = accountDetails?.role === 'admin';
  const onLogout = () => {
    logout({}, () => {
      navigate('/');
    }).then();
  };
  return (
    <Box>
      <IconButton
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={(e: React.MouseEvent<HTMLButtonElement>) =>
          setAnchorEl(e.currentTarget)
        }
        color="inherit"
      >
        <Avatar
          alt={`picture of ${accountDetails?.name}`}
          src={accountDetails?.imageUrl}
        />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
      >
        <MenuItem className="flex flex-col items-center" disabled>
          {accountDetails?.name}
        </MenuItem>
        <MenuItem
          key="profile"
          component={RouterLink}
          to="/profile"
          onClick={() => setAnchorEl(null)}
        >
          <Button className="w-full" aria-label="user profile button">
            Profile
          </Button>
        </MenuItem>
        {isAdmin && (
          <MenuItem
            key="profile"
            component={RouterLink}
            to="/admin/orders"
            onClick={() => setAnchorEl(null)}
          >
            <Button className="w-full" aria-label="user profile button">
              Admin Page
            </Button>
          </MenuItem>
        )}
        {isGuest ? (
          <MenuItem
            component={RouterLink}
            to="/auth/login"
            onClick={() => setAnchorEl(null)}
          >
            <Button
              className="w-full"
              aria-label="login button"
              variant="contained"
              color="secondary"
            >
              Login
            </Button>
          </MenuItem>
        ) : (
          <MenuItem onClick={onLogout} key="logout">
            <Button
              className="w-full"
              aria-label="login button"
              variant="contained"
              color="secondary"
            >
              Logout
            </Button>
          </MenuItem>
        )}
      </Menu>
    </Box>
  );
};
