import { createTheme } from '@mui/material';

const spacing = 4;
const typography = { fontSize: 13, htmlFontSize: 15 };

export const lightTheme = createTheme({
  spacing,
  typography,
  palette: {
    mode: 'light',
    primary: {
      main: '#0d5698',
    },
    secondary: {
      main: '#93224e',
    },
  },
});

export const darkTheme = createTheme({
  spacing,
  typography,
  palette: {
    mode: 'dark',
    primary: {
      main: '#add6f8',
    },
    secondary: {
      main: '#bc2a75',
    },
  },
});
