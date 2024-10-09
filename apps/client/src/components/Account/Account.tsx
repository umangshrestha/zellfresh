import React, { useEffect, useState } from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Link from '@mui/material/Link';
import Button from '@mui/material/Button';
import { useStorageStore } from '../../lib/store';
import Box from '@mui/material/Box';
import { jwtDecode } from 'jwt-decode';

import Avatar from '@mui/material/Avatar';

export const Account = () => {
  const logout = useStorageStore((state) => state.logout);
  const token = useStorageStore((state) => state.token);
  const provider = useStorageStore((state) => state.provider);
  const [data, setData] = useState<Record<string, string> | null>(null);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  useEffect(() => {
    if (provider === 'google') {
      setData(jwtDecode(token));
    } else {
      setData(null);
    }
  }, [provider, token]);

  if (!data) {
    return (
      <Button
        aria-label="login button"
        component={Link}
        href="/auth/login"
        variant="contained"
        color="secondary"
      >
        Login
      </Button>
    );
  } else {
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
          <Avatar alt={`picture of ${data?.name}`} src={data?.picture} />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={() => setAnchorEl(null)}
        >
          <MenuItem
            onClick={() => {
              logout();
              setAnchorEl(null);
            }}
          >
            Logout
          </MenuItem>
        </Menu>
      </Box>
    );
  }
};
