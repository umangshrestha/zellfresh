import { CssBaseline } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useMemo } from 'react';
import { useStorageStore } from '../../lib/store';
import { ThemeToggleProviderProps } from './ThemeToggle.types';

export const ThemeToggleProvider = ({ children }: ThemeToggleProviderProps) => {
  const mode = useStorageStore((state) => state.theme);

  const theme = useMemo(() => {
    return createTheme({
      palette: {
        mode,
      },
    });
  }, [mode]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};