import { createTheme, alpha } from '@mui/material/styles';

const PRIMARY = '#1A8CD8';
const SECONDARY = '#2BB3A3';
const BG = '#F6FAFD';
const SURFACE = '#FFFFFF';
const SURFACE_2 = '#F1F7FB';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: PRIMARY,
      light: '#66B7E8',
      dark: '#0E5F9A',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: SECONDARY,
      light: '#76D7CC',
      dark: '#16877B',
      contrastText: '#FFFFFF',
    },
    background: {
      default: BG,
      paper: SURFACE,
    },
    text: {
      primary: '#1F2937',
      secondary: '#5B6B7C',
      disabled: '#9AA7B5',
    },
    divider: 'rgba(31, 41, 55, 0.1)',
    success: { main: '#10B981' },
    error: { main: '#FF6B6B' },
    warning: { main: '#FBBF24' },
    info: { main: '#38BDF8' },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: { fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.08 },
    h2: { fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1.18 },
    h3: { fontWeight: 700, letterSpacing: '-0.01em', lineHeight: 1.3 },
    h4: { fontWeight: 600, lineHeight: 1.4 },
    h5: { fontWeight: 600, lineHeight: 1.5 },
    h6: { fontWeight: 600, lineHeight: 1.6 },
    body1: { lineHeight: 1.8 },
    body2: { lineHeight: 1.7 },
    button: { textTransform: 'none', fontWeight: 600, letterSpacing: '0.01em' },
    overline: { letterSpacing: '0.15em', fontWeight: 600, fontSize: '0.7rem' },
  },
  shape: { borderRadius: 12 },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        '*': {
          scrollbarWidth: 'thin',
          scrollbarColor: `${alpha(PRIMARY, 0.35)} ${SURFACE_2}`,
        },
        '*::-webkit-scrollbar': { width: '6px' },
        '*::-webkit-scrollbar-track': { background: BG },
        '*::-webkit-scrollbar-thumb': {
          background: alpha(PRIMARY, 0.35),
          borderRadius: '3px',
        },
        '*::-webkit-scrollbar-thumb:hover': { background: PRIMARY },
        '::selection': {
          backgroundColor: alpha(PRIMARY, 0.18),
          color: '#1F2937',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 600,
          borderRadius: '8px',
          padding: '10px 28px',
          fontSize: '0.95rem',
          transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
        },
        containedPrimary: {
          background: `linear-gradient(135deg, ${PRIMARY} 0%, ${SECONDARY} 100%)`,
          boxShadow: `0 4px 18px ${alpha(PRIMARY, 0.22)}`,
          '&:hover': {
            boxShadow: `0 8px 28px ${alpha(PRIMARY, 0.28)}`,
            transform: 'translateY(-2px)',
          },
        },
        outlinedPrimary: {
          borderColor: alpha(PRIMARY, 0.7),
          color: PRIMARY,
          '&:hover': {
            backgroundColor: alpha(PRIMARY, 0.1),
            borderColor: PRIMARY,
            boxShadow: `0 0 18px ${alpha(PRIMARY, 0.25)}`,
            transform: 'translateY(-2px)',
          },
        },
        outlinedSecondary: {
          borderColor: alpha(SECONDARY, 0.7),
          color: SECONDARY,
          '&:hover': {
            backgroundColor: alpha(SECONDARY, 0.08),
            borderColor: SECONDARY,
            boxShadow: `0 0 18px ${alpha(SECONDARY, 0.25)}`,
            transform: 'translateY(-2px)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          backgroundColor: SURFACE,
          border: `1px solid ${alpha('#1F2937', 0.08)}`,
          borderRadius: '16px',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            border: `1px solid ${alpha(PRIMARY, 0.28)}`,
            transform: 'translateY(-5px)',
            boxShadow: `0 14px 34px ${alpha(PRIMARY, 0.1)}`,
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontSize: '0.78rem',
          fontWeight: 500,
          borderRadius: '6px',
          height: '26px',
          fontFamily: '"Fira Code", monospace',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          backgroundColor: SURFACE_2,
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: { borderColor: 'rgba(31,41,55,0.1)' },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: { borderRadius: '6px', fontSize: '0.8rem' },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          transition: 'all 0.2s ease',
          '&:hover': { transform: 'scale(1.1)' },
        },
      },
    },
  },
});

export default theme;
