import { useState, useEffect } from 'react';
import {
  AppBar,
  Box,
  Container,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography,
  useScrollTrigger,
  alpha,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from '../LanguageSwitcher';
import { profile } from '../../data/profile';
import { getScrollBehavior, scrollToSection } from '../../utils/scrollToSection';

const NAV_LINKS = [
  { labelKey: 'nav.about', id: 'about' },
  { labelKey: 'nav.experience', id: 'experience' },
  { labelKey: 'nav.projects', id: 'projects' },
  { labelKey: 'nav.skills', id: 'skills' },
  { labelKey: 'nav.contact', id: 'contact' },
];

export default function Navbar() {
  const { t } = useTranslation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  const scrolled = useScrollTrigger({ disableHysteresis: true, threshold: 30 });

  /* Active section tracker via IntersectionObserver */
  useEffect(() => {
    const ids = NAV_LINKS.map((l) => l.id);
    let observers = [];
    let retryTimer;
    let attempts = 0;

    const cleanupObservers = () => {
      observers.forEach((observer) => observer.disconnect());
      observers = [];
    };

    const setupObservers = () => {
      cleanupObservers();
      let hasMissingSection = false;

      ids.forEach((id) => {
        const el = document.getElementById(id);
        if (!el) {
          hasMissingSection = true;
          return;
        }

        const obs = new IntersectionObserver(
          ([entry]) => { if (entry.isIntersecting) setActiveSection(id); },
          { threshold: 0.4 },
        );
        obs.observe(el);
        observers.push(obs);
      });

      if (hasMissingSection && attempts < 20) {
        attempts += 1;
        retryTimer = window.setTimeout(setupObservers, 100);
      }
    };

    setupObservers();

    return () => {
      window.clearTimeout(retryTimer);
      cleanupObservers();
    };
  }, []);

  const handleNavClick = (id) => {
    setMobileOpen(false);
    window.setTimeout(() => scrollToSection(id), 0);
  };

  return (
    <>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          transition: 'all 0.35s ease',
          backgroundColor: scrolled
            ? alpha('#F8FBFE', 0.92)
            : 'transparent',
          backdropFilter: scrolled ? 'blur(8px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(8px)' : 'none',
          borderBottom: scrolled
            ? '1px solid rgba(15,37,55,0.12)'
            : '1px solid transparent',
          '@supports not ((backdrop-filter: blur(1px)) or (-webkit-backdrop-filter: blur(1px)))': {
            backgroundColor: scrolled ? alpha('#F8FBFE', 0.98) : 'transparent',
          },
        }}
      >
        <Container maxWidth="lg">
          <Toolbar disableGutters sx={{ py: 0.5 }}>
            {/* Logo / name */}
            <Box
              onClick={() => window.scrollTo({ top: 0, behavior: getScrollBehavior() })}
              sx={{
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                flexGrow: { xs: 1, md: 0 },
                mr: { md: 5 },
              }}
            >
              <Box
                sx={{
                  width: 36,
                  height: 36,
                  borderRadius: '8px',
                  background: 'linear-gradient(135deg, #0B5CAB 0%, #159DB3 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: '"Fira Code", monospace',
                  fontWeight: 700,
                  fontSize: '0.85rem',
                  color: '#F8FBFE',
                  flexShrink: 0,
                }}
              >
                {profile.initials}
              </Box>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 700,
                  fontSize: '1rem',
                  background: 'linear-gradient(90deg, #0F2537 40%, #40586D 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  display: { xs: 'none', sm: 'block' },
                }}
              >
                {profile.firstName}
                <Typography component="span" sx={{ color: 'primary.main', WebkitTextFillColor: 'initial' }}>
                  .crm
                </Typography>
              </Typography>
            </Box>

            {/* Desktop nav links */}
            <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 0.5, flexGrow: 1 }}>
              {NAV_LINKS.map((link, index) => (
                <Box
                  component="button"
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  sx={{
                    border: 0,
                    background: 'transparent',
                    color: activeSection === link.id ? 'primary.main' : 'text.secondary',
                    fontFamily: '"Fira Code", monospace',
                    fontSize: '0.8rem',
                    fontWeight: 600,
                    py: 1,
                    px: 1.5,
                    borderRadius: '8px',
                    position: 'relative',
                    cursor: 'pointer',
                    transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
                    appearance: 'none',
                    '&::before': {
                      content: `"0${index + 1}."`,
                      color: 'primary.main',
                      fontSize: '0.7rem',
                      mr: 0.5,
                      fontWeight: 600,
                    },
                    '&:hover': { color: 'primary.main', bgcolor: alpha('#0B5CAB', 0.1) },
                    '&:focus-visible': {
                      outline: `3px solid ${alpha('#0B5CAB', 0.26)}`,
                      outlineOffset: 2,
                    },
                  }}
                >
                  {t(link.labelKey)}
                </Box>
              ))}
            </Box>

            <LanguageSwitcher sx={{ display: { xs: 'none', md: 'inline-flex' }, ml: 1 }} />

            {/* Curriculum button */}
            {profile.resume && (
              <Box
                component="a"
                href={profile.resume}
                download
                sx={{
                  display: { xs: 'none', md: 'flex' },
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: '"Fira Code", monospace',
                  fontSize: '0.78rem',
                  fontWeight: 600,
                  ml: 2,
                  px: 2,
                  py: 0.75,
                  borderRadius: '8px',
                  border: `1px solid ${alpha('#0B5CAB', 0.72)}`,
                  color: 'primary.main',
                  textDecoration: 'none',
                  transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
                  '&:hover': {
                    bgcolor: alpha('#0B5CAB', 0.12),
                    borderColor: 'primary.main',
                    boxShadow: `0 0 18px ${alpha('#0B5CAB', 0.24)}`,
                    transform: 'translateY(-2px)',
                  },
                }}
              >
                {t('nav.resume')}
              </Box>
            )}

            {/* Mobile hamburger */}
            <IconButton
              color="inherit"
              onClick={() => setMobileOpen(true)}
              sx={{ display: { md: 'none' } }}
              aria-label={t('nav.openMenu')}
            >
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        PaperProps={{
          sx: {
            width: 280,
            bgcolor: '#F8FBFE',
            borderLeft: '1px solid rgba(15,37,55,0.12)',
            px: 2,
            py: 3,
          },
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 3 }}>
          <IconButton onClick={() => setMobileOpen(false)} aria-label={t('nav.closeMenu')}>
            <CloseIcon />
          </IconButton>
        </Box>

        <LanguageSwitcher sx={{ mb: 3 }} />

        <List disablePadding>
          {NAV_LINKS.map((link, index) => (
            <ListItem key={link.id} disablePadding sx={{ mb: 1 }}>
              <ListItemButton
                onClick={() => handleNavClick(link.id)}
                sx={{
                  borderRadius: '8px',
                  color: activeSection === link.id ? 'primary.main' : 'text.secondary',
                  bgcolor: activeSection === link.id ? alpha('#0B5CAB', 0.12) : 'transparent',
                }}
              >
                <Typography
                  sx={{
                    fontFamily: '"Fira Code", monospace',
                    fontSize: '0.75rem',
                    color: 'primary.main',
                    mr: 1.5,
                    minWidth: 24,
                  }}
                >
                  0{index + 1}.
                </Typography>
                <ListItemText primary={t(link.labelKey)} primaryTypographyProps={{ fontWeight: 500 }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>

        {profile.resume && (
          <Box sx={{ mt: 4, px: 1 }}>
            <Box
              component="a"
              href={profile.resume}
              download
              sx={{
                display: 'flex',
                justifyContent: 'center',
                width: '100%',
                px: 2,
                py: 1.1,
                borderRadius: '8px',
                border: `1px solid ${alpha('#0B5CAB', 0.72)}`,
                color: 'primary.main',
                textDecoration: 'none',
                fontWeight: 600,
              }}
            >
              {t('nav.downloadResume')}
            </Box>
          </Box>
        )}
      </Drawer>
    </>
  );
}
