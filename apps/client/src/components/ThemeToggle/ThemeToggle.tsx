import { useStorageStore } from '@/lib/store';
import DarkModeRoundedIcon from '@mui/icons-material/DarkModeRounded';
import LightModeIcon from '@mui/icons-material/LightModeRounded';
import IconButton from '@mui/material/IconButton';

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
