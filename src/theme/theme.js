import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1E2F4D', // Xanh dương đậm sang trọng
      light: '#2C4366',
      dark: '#152238',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#C6A355', // Vàng gold sang trọng
      light: '#D4B76B',
      dark: '#B08D3C',
      contrastText: '#1E2F4D',
    },
    background: {
      default: '#F8F9FC', // Màu nền trắng xanh nhẹ
      paper: '#FFFFFF',
    },
    text: {
      primary: '#1E2F4D', // Màu chữ xanh đậm
      secondary: '#5A6A82', // Màu chữ xanh nhạt
    },
    divider: 'rgba(30, 47, 77, 0.08)',
    error: {
      main: '#DC3545',
      light: '#E35D6A',
      dark: '#BD2130',
    },
    success: {
      main: '#198754',
      light: '#28A745',
      dark: '#0F5132',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 600,
      color: '#1E2F4D',
      letterSpacing: '-0.02em',
    },
    button: {
      textTransform: 'none',
      fontWeight: 500,
      letterSpacing: '0.02em',
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#1E2F4D',
          backgroundImage: 'linear-gradient(to right, #1E2F4D, #2C4366)',
          boxShadow: '0 2px 12px rgba(30, 47, 77, 0.08)',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
          fontWeight: 500,
          padding: '8px 20px',
        },
        containedPrimary: {
          backgroundColor: '#1E2F4D',
          boxShadow: '0 2px 8px rgba(30, 47, 77, 0.15)',
          '&:hover': {
            backgroundColor: '#2C4366',
            boxShadow: '0 4px 12px rgba(30, 47, 77, 0.2)',
          },
        },
        containedSecondary: {
          backgroundColor: '#C6A355',
          color: '#FFFFFF',
          boxShadow: '0 2px 8px rgba(198, 163, 85, 0.15)',
          '&:hover': {
            backgroundColor: '#D4B76B',
            boxShadow: '0 4px 12px rgba(198, 163, 85, 0.2)',
          },
        },
        outlinedPrimary: {
          borderColor: '#1E2F4D',
          color: '#1E2F4D',
          '&:hover': {
            backgroundColor: 'rgba(30, 47, 77, 0.04)',
            borderColor: '#2C4366',
          },
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          backgroundColor: '#FFFFFF',
          backgroundImage: 'linear-gradient(135deg, #FFFFFF 0%, #F8F9FC 100%)',
          borderRadius: 16,
          boxShadow: '0 8px 32px rgba(30, 47, 77, 0.08)',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 8,
            '&:hover fieldset': {
              borderColor: '#1E2F4D',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#1E2F4D',
            },
          },
          '& .MuiInputLabel-root.Mui-focused': {
            color: '#1E2F4D',
          },
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          '&:hover': {
            backgroundColor: 'rgba(30, 47, 77, 0.04)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 4px 20px rgba(30, 47, 77, 0.05)',
          '&:hover': {
            boxShadow: '0 8px 24px rgba(30, 47, 77, 0.08)',
          },
        },
      },
    },
    MuiBadge: {
      styleOverrides: {
        badge: {
          fontWeight: 600,
          fontSize: '0.75rem',
          minWidth: 20,
          height: 20,
        },
      },
    },
  },
  shape: {
    borderRadius: 8,
  },
  shadows: [
    'none',
    '0 2px 8px rgba(30, 47, 77, 0.05)',
    '0 4px 16px rgba(30, 47, 77, 0.08)',
    '0 8px 24px rgba(30, 47, 77, 0.1)',
    // ... các shadow khác
  ],
});

export default theme; 