import { createTheme } from '@mui/material';

const spacing = 4;

export const lightTheme = createTheme({
  spacing,
  palette: {
    mode: 'light',
    primary: {
      main: '#072e52',
    },
    secondary: {
      main: '#93224E',
    },
  },
});

export const darkTheme = createTheme({
  spacing,
  palette: {
    mode: 'dark',
    primary: {
      main: '#b3bcc5',
    },
    secondary: {
      main: '#9C2A55',
    },
  },
});
