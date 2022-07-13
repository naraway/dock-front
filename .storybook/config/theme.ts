import { createTheme } from '@mui/material';

const spacing = 4;

const theme = createTheme( {
  spacing,
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
    MuiDialogTitle: {
      styleOverrides: {
        root: {
          borderBottom: '1px solid #c4c4c4',
          marginBottom: spacing * 2,
        }
      }
    },
  }
});

export default theme;
