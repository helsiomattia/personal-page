import { Box, Container, Divider, IconButton, Typography, Tooltip, alpha } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import { profile } from '../../data/profile';

const SOCIAL = [
  { icon: <GitHubIcon />, label: 'GitHub', href: profile.github },
  { icon: <LinkedInIcon />, label: 'LinkedIn', href: profile.linkedin },
  { icon: <EmailOutlinedIcon />, label: 'E-mail', href: `mailto:${profile.email}` },
];

const NAV_LINKS = [
  { label: 'Sobre', id: 'about' },
  { label: 'Experiência', id: 'experience' },
  { label: 'Credenciais', id: 'projects' },
  { label: 'Expertise', id: 'skills' },
  { label: 'Contato', id: 'contact' },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <Box
      component="footer"
      sx={{
        bgcolor: '#FFFFFF',
        borderTop: '1px solid rgba(31,41,55,0.08)',
        py: 5,
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            alignItems: { xs: 'center', md: 'center' },
            justifyContent: 'space-between',
            gap: 3,
            mb: 3,
          }}
        >
          {/* Brand */}
          <Box sx={{ textAlign: { xs: 'center', md: 'left' } }}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                background: 'linear-gradient(90deg, #1A8CD8 0%, #2BB3A3 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                mb: 0.5,
              }}
            >
              {profile.name}
            </Typography>
            <Typography
              variant="caption"
              sx={{
                color: 'text.secondary',
                fontFamily: '"Fira Code", monospace',
              }}
            >
              {profile.title}
            </Typography>
          </Box>

          {/* Nav links */}
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', justifyContent: 'center' }}>
            {NAV_LINKS.map((link) => (
              <Typography
                key={link.id}
                component="a"
                onClick={() => {
                  const el = document.getElementById(link.id);
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                sx={{
                  color: 'text.secondary',
                  fontSize: '0.85rem',
                  cursor: 'pointer',
                  textDecoration: 'none',
                  transition: 'color 0.2s',
                  '&:hover': { color: 'primary.main' },
                }}
              >
                {link.label}
              </Typography>
            ))}
          </Box>

          {/* Social Icons */}
          <Box sx={{ display: 'flex', gap: 0.5 }}>
            {SOCIAL.map((s) => (
              <Tooltip key={s.label} title={s.label} arrow>
                <IconButton
                  component="a"
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  size="small"
                  aria-label={s.label}
                  sx={{
                    color: 'text.secondary',
                    '&:hover': {
                      color: 'primary.main',
                      bgcolor: alpha('#1A8CD8', 0.08),
                    },
                  }}
                >
                  {s.icon}
                </IconButton>
              </Tooltip>
            ))}
          </Box>
        </Box>

        <Divider sx={{ mb: 3 }} />

        <Typography
          variant="caption"
          sx={{ display: 'block', textAlign: 'center', color: 'text.secondary' }}
        >
          © {year} {profile.name} — Salesforce CRM | Sales & Service Cloud
        </Typography>
      </Container>
    </Box>
  );
}
