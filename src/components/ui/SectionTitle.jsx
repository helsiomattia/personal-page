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
      <Box sx={{ textAlign: align, mb: { xs: 4.5, md: 5.5 } }}>
        {overline && (
          <Typography
            component="span"
            sx={{
              display: 'block',
              mb: 1.25,
              color: 'primary.main',
              fontFamily: '"Fira Code", monospace',
              fontSize: { xs: '0.68rem', md: '0.72rem' },
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              fontWeight: 700,
              opacity: 0.9,
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
            lineHeight: 1.12,
            letterSpacing: '-0.035em',
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
              lineHeight: 1.75,
              fontSize: { xs: '0.98rem', md: '1.04rem' },
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
            background: 'linear-gradient(90deg, #0B5CAB 0%, #159DB3 100%)',
          }}
        />
      </Box>
    </AnimatedBox>
  );
}
