import {
  Box,
  Chip,
  Container,
  Paper,
  Typography,
  alpha,
} from '@mui/material';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import SectionTitle from '../ui/SectionTitle';
import { experiences } from '../../data/experience';
import { getLocalizedString, getLocalizedStringArray } from '../../utils/i18nHelper';

/* ── Single timeline entry ─────────────────────────────── */
function ExperienceCard({ exp, index, lang }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.65, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
    >
      <Box
        sx={{
          display: 'flex',
          gap: { xs: 2, md: 4 },
          mb: 3,
          position: 'relative',
        }}
      >
        {/* ── Left: dot + connector ── */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            flexShrink: 0,
          }}
        >
          {/* Company avatar */}
          <Box
            sx={{
              width: 48,
              height: 48,
              borderRadius: '12px',
              background: `linear-gradient(135deg, ${alpha(exp.color, 0.3)} 0%, ${alpha(exp.color, 0.1)} 100%)`,
              border: `2px solid ${alpha(exp.color, 0.5)}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.1rem',
              fontWeight: 800,
              color: exp.color,
              flexShrink: 0,
              boxShadow: `0 0 16px ${alpha(exp.color, 0.16)}`,
              zIndex: 1,
            }}
          >
            {exp.company.charAt(0)}
          </Box>

          {/* Vertical line */}
          <Box
            sx={{
              width: '2px',
              flex: 1,
              minHeight: 24,
              background: `linear-gradient(to bottom, ${alpha(exp.color, 0.5)} 0%, transparent 100%)`,
              mt: 1,
            }}
          />
        </Box>

        {/* ── Right: content card ── */}
        <Paper
          elevation={0}
          sx={{
            flex: 1,
            p: { xs: 2.5, md: 3.5 },
            mb: 2,
            bgcolor: '#F8FBFE',
            border: '1px solid rgba(15,37,55,0.12)',
            borderRadius: '16px',
            boxShadow: exp.current ? `0 14px 34px ${alpha(exp.color, 0.1)}` : '0 8px 24px rgba(15,37,55,0.045)',
            transition: 'all 0.3s ease',
            '&:hover': {
              border: `1px solid ${alpha(exp.color, 0.4)}`,
              boxShadow: `0 10px 30px ${alpha(exp.color, 0.09)}`,
              transform: 'translateY(-2px)',
            },
          }}
        >
          {/* Header row */}
          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              gap: 1,
              mb: 1.5,
            }}
          >
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 700, color: 'text.primary', mb: 0.25 }}>
                {getLocalizedString(exp.role, lang)}
              </Typography>
              <Typography
                variant="body2"
                sx={{ fontWeight: 600, color: exp.color, fontFamily: '"Fira Code", monospace', fontSize: '0.85rem' }}
              >
                {exp.company}
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: { xs: 'flex-start', sm: 'flex-end' }, gap: 0.5 }}>
              <Chip
                label={getLocalizedString(exp.period, lang)}
                size="small"
                icon={<WorkOutlineIcon style={{ fontSize: '0.75rem' }} />}
                sx={{
                  bgcolor: alpha(exp.color, 0.1),
                  border: `1px solid ${alpha(exp.color, 0.25)}`,
                  color: exp.color,
                  fontFamily: '"Fira Code", monospace',
                  fontSize: '0.72rem',
                  height: 24,
                  maxWidth: '100%',
                  '& .MuiChip-label': {
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  },
                }}
              />
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <PlaceOutlinedIcon sx={{ fontSize: '0.8rem', color: 'text.secondary' }} />
                <Typography variant="caption" color="text.secondary">
                  {getLocalizedString(exp.location, lang)} · {getLocalizedString(exp.type, lang)}
                </Typography>
              </Box>
            </Box>
          </Box>

          {/* Description */}
          <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2, lineHeight: 1.75 }}>
            {getLocalizedString(exp.description, lang)}
          </Typography>

          {/* Achievements */}
          <Box sx={{ mb: 2.5 }}>
            {getLocalizedStringArray(exp.achievements, lang).map((item) => (
              <Box key={item} sx={{ display: 'flex', gap: 1, alignItems: 'flex-start', mb: 1 }}>
                <CheckCircleOutlineIcon sx={{ fontSize: '0.95rem', color: exp.color, mt: '3px', flexShrink: 0 }} />
                <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.65 }}>
                  {item}
                </Typography>
              </Box>
            ))}
          </Box>

          {/* Tech chips */}
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.8 }}>
            {exp.technologies.map((tech) => (
              <Chip
                key={tech}
                label={tech}
                size="small"
                sx={{
                  bgcolor: 'rgba(11,92,171,0.08)',
                  border: '1px solid rgba(11,92,171,0.18)',
                  color: 'text.secondary',
                  fontFamily: '"Fira Code", monospace',
                  fontSize: '0.72rem',
                  maxWidth: '100%',
                  '& .MuiChip-label': {
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  },
                }}
              />
            ))}
          </Box>
        </Paper>
      </Box>
    </motion.div>
  );
}

/* ── Experience section ─────────────────────────────────── */
export default function Experience() {
  const { i18n, t } = useTranslation();
  const lang = i18n.resolvedLanguage || 'pt';

  return (
    <Box
      id="experience"
      component="section"
      sx={{
        py: { xs: 8, md: 10 },
        background: 'linear-gradient(180deg, #F3F8FC 0%, #EAF2F8 100%)',
      }}
    >
      <Container maxWidth="md">
        <SectionTitle
          overline={t('experience.overline')}
          title={t('experience.title')}
          subtitle={t('experience.subtitle')}
        />

        <Box>
          {experiences.map((exp, index) => (
            <ExperienceCard key={exp.id} exp={exp} index={index} lang={lang} />
          ))}
        </Box>
      </Container>
    </Box>
  );
}
