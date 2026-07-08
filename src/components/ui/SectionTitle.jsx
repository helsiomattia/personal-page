import { Box, Typography } from '@mui/material';
import AnimatedBox from './AnimatedBox';

/**
 * Título de seção padronizado com linha de destaque gradiente.
 * @param {string} overline - Texto pequeno acima do título (ex: "01. sobre")
 * @param {string} title - Título principal da seção
 * @param {string} [subtitle] - Subtítulo opcional
 * @param {'center'|'left'} [align='center']
 */
export default function SectionTitle({
  overline,
  title,
  subtitle,
  align = 'center',
  subtitleMaxWidth = '640px',
  dividerHeight = 4,
  dividerWidth = 56,
}) {
  return (
    <AnimatedBox>
      <Box sx={{ textAlign: align, mb: { xs: 4, md: 5 } }}>
        {overline && (
          <Typography
            component="span"
            sx={{
              display: 'block',
              mb: 1,
              color: 'primary.main',
              fontFamily: '"Fira Code", monospace',
              fontSize: '0.74rem',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              fontWeight: 600,
              opacity: 0.86,
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
              maxWidth: subtitleMaxWidth,
              mx: align === 'center' ? 'auto' : 0,
              color: 'text.secondary',
              mt: 1,
            }}
          >
            {subtitle}
          </Typography>
        )}

        {/* Barra de destaque gradiente */}
        <Box
          sx={{
            mt: 2,
            mx: align === 'center' ? 'auto' : 0,
            width: dividerWidth,
            height: dividerHeight,
            borderRadius: 2,
            background: 'linear-gradient(90deg, #1A8CD8 0%, #2BB3A3 100%)',
          }}
        />
      </Box>
    </AnimatedBox>
  );
}
