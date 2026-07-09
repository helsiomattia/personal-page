import { useMemo, useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Container,
  Grid,
  IconButton,
  Stack,
  Tooltip,
  Typography,
  alpha,
} from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import ForkRightOutlinedIcon from '@mui/icons-material/ForkRightOutlined';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import SectionTitle from '../ui/SectionTitle';
import { projects, projectFilters } from '../../data/projects';
import { getLocalizedString, getLocalizedStringArray } from '../../utils/i18nHelper';

/* ── Project card ──────────────────────────────────────── */
function ProjectCard({ project, index, lang, t }) {
  const status = getLocalizedString(project.status, lang);
  const technologies = getLocalizedStringArray(project.technologies, lang);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.92 }}
      transition={{ duration: 0.45, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
      style={{ height: '100%' }}
    >
      <Card
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          overflow: 'hidden',
          cursor: 'default',
          bgcolor: 'rgba(248,251,254,0.94)',
          borderColor: project.featured ? alpha('#0B5CAB', 0.26) : 'rgba(15,37,55,0.12)',
          boxShadow: project.featured ? '0 14px 34px rgba(11,92,171,0.1)' : undefined,
          '&:hover .project-overlay': { opacity: 1 },
          '&:hover .project-gradient': { opacity: 0.9 },
          '&:hover': {
            borderColor: alpha('#0B5CAB', 0.36),
            boxShadow: '0 16px 38px rgba(11,92,171,0.12)',
          },
        }}
      >
        {/* Gradient header */}
        <Box
          className="project-gradient"
          sx={{
            height: 8,
            background: project.gradient,
            transition: 'opacity 0.3s ease',
          }}
        />

        <CardContent sx={{ flex: 1, display: 'flex', flexDirection: 'column', p: 3 }}>
          {/* Top row: status + links */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Chip
              label={status}
              size="small"
              sx={{
                fontSize: '0.7rem',
                height: 22,
                bgcolor: alpha(
                  status === 'In production'
                    ? '#0B8F61'
                    : status === 'Active'
                    ? '#0B78B6'
                    : '#6B8194',
                  0.15,
                ),
                color:
                  status === 'In production'
                    ? '#0B8F61'
                    : status === 'Active'
                    ? '#0B78B6'
                    : '#5C7183',
                border: `1px solid ${alpha(
                  status === 'In production'
                    ? '#0B8F61'
                    : status === 'Active'
                    ? '#0B78B6'
                    : '#6B8194',
                  0.3,
                )}`,
                fontFamily: '"Fira Code", monospace',
              }}
            />

            <Box sx={{ display: 'flex', gap: 0.5 }}>
              {project.github && (
                <Tooltip title={t('projects.repository')} arrow>
                  <IconButton
                    component="a"
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    size="small"
                    aria-label="GitHub"
                    sx={{
                      color: 'text.secondary',
                      '&:hover': { color: 'primary.main', bgcolor: alpha('#0B5CAB', 0.1) },
                    }}
                  >
                    <GitHubIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              )}
              {project.demo && (
                <Tooltip title={t('projects.viewDemo')} arrow>
                  <IconButton
                    component="a"
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    size="small"
                    aria-label="Demo"
                    sx={{
                      color: 'text.secondary',
                      '&:hover': { color: 'secondary.main', bgcolor: alpha('#159DB3', 0.1) },
                    }}
                  >
                    <OpenInNewIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              )}
            </Box>
          </Box>

          {/* Title */}
          <Typography variant="h6" sx={{ fontWeight: 700, mb: 1, fontSize: '1rem', color: 'text.primary' }}>
            {getLocalizedString(project.title, lang)}
          </Typography>

          {/* Description */}
          <Typography
            variant="body2"
            sx={{ color: 'text.secondary', mb: 2.5, flex: 1, lineHeight: 1.7, fontSize: '0.88rem' }}
          >
            {getLocalizedString(project.description, lang)}
          </Typography>

          {/* Tech chips */}
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.7, mb: 2.5 }}>
            {technologies.map((tech) => (
              <Chip
                key={tech}
                label={tech}
                size="small"
                sx={{
                  bgcolor: 'rgba(11,92,171,0.08)',
                  border: '1px solid rgba(11,92,171,0.2)',
                  color: 'primary.main',
                  fontFamily: '"Fira Code", monospace',
                  fontSize: '0.7rem',
                  maxWidth: '100%',
                  '& .MuiChip-label': {
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  },
                }}
              />
            ))}
          </Box>

          {(project.stars !== null || project.forks !== null) && (
            <Stack direction="row" spacing={2} sx={{ pt: 1.5, borderTop: '1px solid rgba(15,37,55,0.12)' }}>
              {project.stars !== null && (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <StarOutlineIcon sx={{ fontSize: '0.9rem', color: '#B7791F' }} />
                  <Typography variant="caption" sx={{ color: 'text.secondary', fontFamily: '"Fira Code", monospace' }}>
                    {project.stars}
                  </Typography>
                </Box>
              )}
              {project.forks !== null && (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <ForkRightOutlinedIcon sx={{ fontSize: '0.9rem', color: 'text.secondary' }} />
                  <Typography variant="caption" sx={{ color: 'text.secondary', fontFamily: '"Fira Code", monospace' }}>
                    {project.forks}
                  </Typography>
                </Box>
              )}
            </Stack>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}

/* ── Projects section ──────────────────────────────────── */
export default function Projects() {
  const { i18n, t } = useTranslation();
  const lang = i18n.resolvedLanguage || 'pt';
  const [activeFilter, setActiveFilter] = useState('all');

  const filtered = useMemo(() => {
    if (activeFilter === 'all') return projects;
    return projects.filter((p) => p.categories.includes(activeFilter));
  }, [activeFilter]);

  return (
    <Box
      id="projects"
      component="section"
      sx={{
        py: { xs: 8, md: 10 },
        background: 'linear-gradient(180deg, #EAF2F8 0%, #F3F8FC 100%)',
      }}
    >
      <Container maxWidth="lg">
        <SectionTitle
          overline={t('projects.overline')}
          title={t('projects.title')}
          subtitle={t('projects.subtitle')}
        />

        {/* Filter buttons */}
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 1,
            justifyContent: 'center',
            mb: 4,
          }}
        >
          {projectFilters.map((f) => (
            <Button
              key={f.value}
              variant={activeFilter === f.value ? 'contained' : 'outlined'}
              color="primary"
              size="small"
              onClick={() => setActiveFilter(f.value)}
              sx={{
                fontFamily: '"Fira Code", monospace',
                fontSize: '0.78rem',
                py: 0.6,
                px: 2,
                minWidth: 0,
                ...(activeFilter !== f.value && {
                  borderColor: 'rgba(15,37,55,0.18)',
                  color: 'text.secondary',
                  '&:hover': {
                    borderColor: 'primary.main',
                    color: 'primary.main',
                    bgcolor: alpha('#0B5CAB', 0.1),
                  },
                }),
              }}
            >
              {getLocalizedString(f.label, lang)}
            </Button>
          ))}
        </Box>

        {/* Cards grid */}
        <Grid container spacing={3}>
          <AnimatePresence mode="wait">
            {filtered.map((project, index) => (
              <Grid item xs={12} sm={6} lg={4} key={project.id}>
                <ProjectCard project={project} index={index} lang={lang} t={t} />
              </Grid>
            ))}
          </AnimatePresence>
        </Grid>

        {filtered.length === 0 && (
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <Typography color="text.secondary">
              {t('projects.noResults')}
            </Typography>
          </Box>
        )}
      </Container>
    </Box>
  );
}
