import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import React, { useEffect, useState } from 'react';
import { useStorageStore } from '../../lib/store';

import Avatar from '@mui/material/Avatar';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useNotification } from '../../components/Notification/Notification.hooks';
import { logout, me } from '../../lib/axios';

export const Account = () => {
  const navigate = useNavigate();
  const { setNotification } = useNotification();
  const userDetails = useStorageStore((state) => state.userDetails);
  const setUserDetails = useStorageStore((state) => state.setUserDetails);

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const isGuest = !userDetails || userDetails?.role === 'guest';

  const onLogout = () => {
    logout()
      .then(() => {
        setUserDetails(null);
        navigate('/');
      })
      .catch((error) => {
        setNotification({
          message: error.message,
          severity: 'error',
        });
      });
    setAnchorEl(null);
  };

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    me({ signal })
      .then((response) => {
        setUserDetails(response.data);
      })
      .catch((error) => {
        if (axios.isCancel(error)) return;
        setUserDetails(null);
        setNotification({
          message: error.message,
          severity: 'error',
        });
      });

    return () => {
      controller.abort();
    };
  }, [setNotification, setUserDetails]);

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
          alt={`picture of ${userDetails?.name}`}
          src={
            userDetails?.imageUrl ||
            'https://cdn-icons-png.flaticon.com/512/149/149071.png'
          }
        />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
      >
        <MenuItem
          style={{ display: isGuest ? 'none' : 'block' }}
          onClick={onLogout}
        >
          <Button
            aria-label="login button"
            variant="contained"
            color="secondary"
          >
            Logout
          </Button>
        </MenuItem>
        <MenuItem
          style={{ display: isGuest ? 'block' : 'none' }}
          onClick={() => {
            setAnchorEl(null);
          }}
        >
          <Button
            aria-label="login button"
            component={Link}
            href="/auth/login"
            variant="contained"
            color="secondary"
          >
            Login
          </Button>
        </MenuItem>
      </Menu>
    </Box>
  );
};
