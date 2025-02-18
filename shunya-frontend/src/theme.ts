import { createTheme } from '@mui/material';

export const theme = createTheme({
  palette: {
    background: {
      default: '#F8FAFC', // Softer background color
      paper: '#FFFFFF',
    },
    primary: {
      light: '#E3F2FD',
      main: '#2196F3', // Calming blue
      dark: '#1976D2',
      contrastText: '#FFFFFF',
    },
    error: {
      light: '#FFEBEE',
      main: '#EF5350', // Softer red for negative emotions
      dark: '#D32F2F',
    },
    warning: {
      light: '#FFF8E1',
      main: '#FFB74D', // Softer amber for neutral emotions
      dark: '#F57C00',
    },
    success: {
      light: '#E8F5E9',
      main: '#66BB6A', // Softer green for positive emotions
      dark: '#388E3C',
    },
    text: {
      primary: '#1A2027', // Softer black for better readability
      secondary: '#5E6A75', // Warmer gray for secondary text
    },
  },
  typography: {
    fontFamily: '"Inter", "Segoe UI", "Roboto", "Arial", sans-serif',
    h3: {
      fontWeight: 600,
      fontSize: '2.5rem',
      letterSpacing: '-0.02em',
    },
    h5: {
      fontWeight: 500,
      fontSize: '1.5rem',
      letterSpacing: '-0.01em',
    },
    subtitle1: {
      fontSize: '1.1rem',
      lineHeight: 1.5,
      color: '#5E6A75',
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.6,
    },
    body2: {
      fontSize: '0.925rem',
      lineHeight: 1.5,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 600,
          padding: '8px 24px',
          fontSize: '0.95rem',
          borderRadius: '12px',
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          },
        },
        contained: {
          '&.Mui-disabled': {
            backgroundColor: '#E0E7EC',
            color: '#94A3B8',
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          height: '36px',
          '&:hover': {
            backgroundColor: '#F1F5F9',
          },
        },
        outlined: {
          borderColor: '#E2E8F0',
          '&:hover': {
            borderColor: '#CBD5E1',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
          borderRadius: 16,
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 12,
            '& fieldset': {
              borderColor: '#E2E8F0',
            },
            '&:hover fieldset': {
              borderColor: '#CBD5E1',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#2196F3',
            },
          },
        },
      },
    },
    MuiContainer: {
      styleOverrides: {
        root: {
          '@media (min-width: 600px)': {
            paddingLeft: 32,
            paddingRight: 32,
          },
        },
      },
    },
  },
  shape: {
    borderRadius: 12,
  },
  spacing: 8,
}); 