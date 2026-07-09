import { Box, Container, Typography } from '@mui/material';
import { profile } from '../../data/profile';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <Box
      component="footer"
      sx={{
        bgcolor: 'rgba(248,251,254,0.94)',
        borderTop: '1px solid rgba(15,37,55,0.12)',
        py: { xs: 2.5, md: 3 },
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 1.5,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Box
              aria-hidden="true"
              sx={{
                width: 28,
                height: 28,
                borderRadius: '8px',
                background: 'linear-gradient(135deg, #0B5CAB 0%, #159DB3 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#F8FBFE',
                fontFamily: '"Fira Code", monospace',
                fontSize: '0.7rem',
                fontWeight: 700,
              }}
            >
              {profile.initials}
            </Box>
            <Typography
              variant="body2"
              sx={{
                fontWeight: 700,
                color: 'text.primary',
                letterSpacing: '-0.01em',
              }}
            >
              {profile.name}
            </Typography>
          </Box>

          <Typography
            variant="caption"
            sx={{
              color: 'text.secondary',
              fontFamily: '"Fira Code", monospace',
              fontSize: '0.72rem',
            }}
          >
            © {year}
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
