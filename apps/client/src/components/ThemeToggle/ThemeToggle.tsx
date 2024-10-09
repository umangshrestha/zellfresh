import LightModeIcon from '@mui/icons-material/LightModeRounded';
import DarkModeRoundedIcon from '@mui/icons-material/DarkModeRounded';
import IconButton from '@mui/material/IconButton';
import { useStorageStore } from '../../lib/store';

export const ThemeToggle = () => {
  const mode = useStorageStore((state) => state.theme);
  const toggle = useStorageStore((state) => state.toggleTheme);
  const isDarkMode = mode === 'dark';

  return (
    <IconButton onClick={toggle}>
      {isDarkMode ? (
        <DarkModeRoundedIcon />
      ) : (
        <LightModeIcon
          sx={{
            color: 'white',
          }}
        />
      )}
    </IconButton>
  );
};
