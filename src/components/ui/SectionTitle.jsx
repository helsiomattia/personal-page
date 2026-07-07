import { Box, Typography } from '@mui/material';
import AnimatedBox from './AnimatedBox';

/**
 * Título de seção padronizado com linha de destaque gradiente.
 * @param {string} overline - Texto pequeno acima do título (ex: "01. sobre")
 * @param {string} title - Título principal da seção
 * @param {string} [subtitle] - Subtítulo opcional
 * @param {'center'|'left'} [align='center']
 */
export default function SectionTitle({ overline, title, subtitle, align = 'center' }) {
  return (
    <AnimatedBox>
      <Box sx={{ textAlign: align, mb: { xs: 6, md: 8 } }}>
        {overline && (
          <Typography
            component="span"
            sx={{
              display: 'block',
              mb: 1,
              color: 'primary.main',
              fontFamily: '"Fira Code", monospace',
              fontSize: '0.78rem',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              fontWeight: 600,
            }}
          >
            // {overline}
          </Typography>
        )}

        <Typography
          variant="h2"
          sx={{
            color: 'text.primary',
            fontSize: { xs: '1.9rem', sm: '2.25rem', md: '2.75rem' },
            mb: subtitle ? 2 : 0,
          }}
        >
          {title}
        </Typography>

        {subtitle && (
          <Typography
            variant="body1"
            sx={{
              maxWidth: '640px',
              mx: align === 'center' ? 'auto' : 0,
              color: 'text.secondary',
              mt: 1.5,
            }}
          >
            {subtitle}
          </Typography>
        )}

        {/* Barra de destaque gradiente */}
        <Box
          sx={{
            mt: 3,
            mx: align === 'center' ? 'auto' : 0,
            width: 56,
            height: 4,
            borderRadius: 2,
            background: 'linear-gradient(90deg, #1A8CD8 0%, #2BB3A3 100%)',
          }}
        />
      </Box>
    </AnimatedBox>
  );
}
