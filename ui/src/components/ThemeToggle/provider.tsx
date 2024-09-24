import { useMemo } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { useStorageStore } from "../../lib/store";

export const ThemeModeProvider = ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
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
