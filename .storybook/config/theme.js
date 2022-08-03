import { createTheme } from '@mui/material';
import { grey } from '@mui/material/colors';

const spacing = 4;

const themeTemplate = {
  components: {
    MuiTextField: {
      defaultProps: {
        size: 'small',
      }
    },
    MuiButton: {
      defaultProps: {
        size: 'small',
      },
      styleOverrides: {
        root: {
          fontWeight: 'bold',
        }
      }
    },
    MuiSelect: {
      defaultProps: {
        size: 'small',
      }
    },
    MuiCheckbox: {
      defaultProps: {
        size: 'small',
      }
    },
    MuiIcon: {
      defaultProps: {
        fontsize: 'small',
      }
    },
    MuiMenuItem: {
      defaultProps: {
        dense: true,
      }
    },
    MuiListItem: {
      defaultProps: {
        dense: true,
      }
    },
  }
};

export const lightTheme = createTheme({
  spacing,
  palette: {
    mode: 'light',
  },
  components: {
    ...themeTemplate.components,
    MuiDialogTitle: {
      styleOverrides: {
        root: {
          borderBottom: `1px solid ${grey[400]}`,
          marginBottom: spacing * 2,
        },
      },
    },
  },
});

export const darkTheme = createTheme({
  spacing,
  palette: {
    mode: 'dark',
  },
  components: {
    ...themeTemplate.components,
    MuiDialogTitle: {
      styleOverrides: {
        root: {
          borderBottom: `1px solid ${grey[500]}`,
          marginBottom: spacing * 2,
        },
      },
    },
  },
});
