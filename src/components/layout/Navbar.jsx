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
  Button,
  useScrollTrigger,
  alpha,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import { profile } from '../../data/profile';

const NAV_LINKS = [
  { label: 'Sobre', id: 'about' },
  { label: 'Experiência', id: 'experience' },
  { label: 'Credenciais', id: 'projects' },
  { label: 'Expertise', id: 'skills' },
  { label: 'Contato', id: 'contact' },
];

function scrollTo(id) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  const scrolled = useScrollTrigger({ disableHysteresis: true, threshold: 30 });

  /* Active section tracker via IntersectionObserver */
  useEffect(() => {
    const ids = NAV_LINKS.map((l) => l.id);
    const observers = [];

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id); },
        { threshold: 0.4 },
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const handleNavClick = (id) => {
    scrollTo(id);
    setMobileOpen(false);
  };

  return (
    <>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          transition: 'all 0.35s ease',
          backgroundColor: scrolled
            ? alpha('#FFFFFF', 0.86)
            : 'transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          borderBottom: scrolled
            ? '1px solid rgba(31,41,55,0.08)'
            : '1px solid transparent',
        }}
      >
        <Container maxWidth="lg">
          <Toolbar disableGutters sx={{ py: 0.5 }}>
            {/* Logo / name */}
            <Box
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
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
                  background: 'linear-gradient(135deg, #1A8CD8 0%, #2BB3A3 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: '"Fira Code", monospace',
                  fontWeight: 700,
                  fontSize: '0.85rem',
                  color: '#fff',
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
                  background: 'linear-gradient(90deg, #1F2937 40%, #5B6B7C 100%)',
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
                <Button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  sx={{
                    color: activeSection === link.id ? 'primary.main' : 'text.secondary',
                    fontFamily: '"Fira Code", monospace',
                    fontSize: '0.8rem',
                    py: 1,
                    px: 1.5,
                    position: 'relative',
                    '&::before': {
                      content: `"0${index + 1}."`,
                      color: 'primary.main',
                      fontSize: '0.7rem',
                      mr: 0.5,
                      fontWeight: 600,
                    },
                    '&:hover': { color: 'primary.main', bgcolor: alpha('#1A8CD8', 0.08) },
                  }}
                >
                  {link.label}
                </Button>
              ))}
            </Box>

            {/* Curriculum button */}
            {profile.resume && (
              <Button
                component="a"
                href={profile.resume}
                download
                variant="outlined"
                color="primary"
                size="small"
                startIcon={<FileDownloadOutlinedIcon />}
                sx={{
                  display: { xs: 'none', md: 'flex' },
                  fontFamily: '"Fira Code", monospace',
                  fontSize: '0.78rem',
                  ml: 2,
                }}
              >
                Currículo
              </Button>
            )}

            {/* Mobile hamburger */}
            <IconButton
              color="inherit"
              onClick={() => setMobileOpen(true)}
              sx={{ display: { md: 'none' } }}
              aria-label="Open menu"
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
            bgcolor: '#FFFFFF',
            borderLeft: '1px solid rgba(31,41,55,0.08)',
            px: 2,
            py: 3,
          },
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 3 }}>
          <IconButton onClick={() => setMobileOpen(false)} aria-label="Close menu">
            <CloseIcon />
          </IconButton>
        </Box>

        <List disablePadding>
          {NAV_LINKS.map((link, index) => (
            <ListItem key={link.id} disablePadding sx={{ mb: 1 }}>
              <ListItemButton
                onClick={() => handleNavClick(link.id)}
                sx={{
                  borderRadius: '8px',
                  color: activeSection === link.id ? 'primary.main' : 'text.secondary',
                  bgcolor: activeSection === link.id ? alpha('#1A8CD8', 0.1) : 'transparent',
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
                <ListItemText primary={link.label} primaryTypographyProps={{ fontWeight: 500 }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>

        {profile.resume && (
          <Box sx={{ mt: 4, px: 1 }}>
            <Button
              component="a"
              href={profile.resume}
              download
              variant="outlined"
              color="primary"
              fullWidth
              startIcon={<FileDownloadOutlinedIcon />}
            >
              Baixar currículo
            </Button>
          </Box>
        )}
      </Drawer>
    </>
  );
}
