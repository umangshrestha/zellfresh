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
import { useNotification } from '../../components/Notification/Notification.hooks';

const fetchData = async (hasUserDetails: boolean) => {
  try {
    const response = await axios.get('/api/auth/me');
    return response.data;
  } catch (error) {
    if (hasUserDetails && axios.isAxiosError(error) && error.response) {
      if (error.response.status !== 401) {
        try {
          await axios.get('/api/auth/refresh');
          return fetchData(false);
        } catch (_) {}
      }
    }
  }
};

export const Account = () => {
  const { setNotification } = useNotification();
  const logoutFn = useStorageStore((state) => state.logout);
  const userDetails = useStorageStore((state) => state.userDetails);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  useEffect(() => {
    if (userDetails?.role === 'guest') return;

    fetchData(!!userDetails).catch((error) => {
      setNotification({
        message: error.message,
        severity: 'error',
      });
    });
  }, [userDetails, setNotification]);

  const isGuest = !userDetails || userDetails?.role === 'guest';

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
          onClick={() => {
            logoutFn({
              onError: (error) => {
                setNotification({
                  message: error.message,
                  severity: 'error',
                });
              },
            });
            setAnchorEl(null);
          }}
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
