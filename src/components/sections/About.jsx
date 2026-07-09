import {
  Avatar,
  Box,
  Chip,
  Container,
  Grid,
  Paper,
  Typography,
  alpha,
} from '@mui/material';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import CodeOutlinedIcon from '@mui/icons-material/CodeOutlined';
import { useTranslation } from 'react-i18next';
import AnimatedBox from '../ui/AnimatedBox';
import SectionTitle from '../ui/SectionTitle';
import { profile } from '../../data/profile';
import { getLocalizedString, getLocalizedStringArray } from '../../utils/i18nHelper';

const badgeColors = ['#0B5CAB', '#159DB3', '#0B8F61', '#4A6478'];

export default function About() {
  const { i18n, t } = useTranslation();
  const lang = i18n.resolvedLanguage || 'pt';

  return (
    <Box
      id="about"
      component="section"
      sx={{
        py: { xs: 8, md: 10 },
        background:
          'linear-gradient(180deg, #DCEAF4 0%, #EAF2F8 48%, #F3F8FC 100%)',
      }}
    >
      <Container
        maxWidth={false}
        sx={{
          maxWidth: '1160px',
          px: { xs: 2.5, sm: 3, md: 4 },
        }}
      >
        <SectionTitle
          overline={t('about.overline')}
          title={t('about.title')}
          subtitle={t('about.subtitle')}
          subtitleMaxWidth="560px"
          dividerHeight={3}
          dividerWidth={48}
        />

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '360px minmax(0, 1fr)' },
            gap: { xs: 3.5, md: 6, lg: 8 },
            alignItems: 'stretch',
            mx: 'auto',
          }}
        >
          {/* ── Left column: avatar + stats ── */}
          <AnimatedBox delay={0.1} style={{ height: '100%' }}>
            <Paper
              elevation={0}
              sx={{
                height: '100%',
                p: { xs: 2.5, sm: 3, md: 3.25 },
                borderRadius: '24px',
                bgcolor: 'rgba(248,251,254,0.9)',
                border: '1px solid rgba(11,92,171,0.18)',
                boxShadow: '0 16px 44px rgba(15,37,55,0.08)',
                backdropFilter: 'blur(6px)',
                WebkitBackdropFilter: 'blur(6px)',
                '@supports not ((backdrop-filter: blur(1px)) or (-webkit-backdrop-filter: blur(1px)))': {
                  bgcolor: 'rgba(248,251,254,0.98)',
                },
                position: 'relative',
                overflow: 'hidden',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  inset: 0,
                  background:
                    'radial-gradient(circle at 50% 0%, rgba(11,92,171,0.16), transparent 42%)',
                  pointerEvents: 'none',
                },
              }}
            >
              <Box
                sx={{
                  position: 'relative',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 2.5,
                }}
              >
                {/* Avatar */}
                <Box sx={{ position: 'relative' }}>
                  <Box
                    sx={{
                      position: 'absolute',
                      inset: -3,
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, #0B5CAB 0%, #159DB3 100%)',
                      zIndex: 0,
                    }}
                  />
                  <Avatar
                    src={profile.avatar || undefined}
                    alt={profile.name}
                    sx={{
                      width: { xs: 132, md: 148 },
                      height: { xs: 132, md: 148 },
                      position: 'relative',
                      zIndex: 1,
                      border: '4px solid #F8FBFE',
                      fontSize: { xs: '2.75rem', md: '3rem' },
                      fontWeight: 700,
                      background: 'linear-gradient(135deg, #F8FBFE 0%, #DCEAF4 100%)',
                      color: 'primary.main',
                      boxShadow: '0 12px 32px rgba(11,92,171,0.16)',
                    }}
                  >
                    {profile.initials}
                  </Avatar>
                </Box>

                {/* Name + location */}
                <Box sx={{ textAlign: 'center', maxWidth: 300 }}>
                  <Typography variant="h5" sx={{ fontWeight: 800, mb: 0.5, letterSpacing: '-0.02em' }}>
                    {profile.name}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: 'primary.main',
                      fontFamily: '"Fira Code", monospace',
                      fontSize: { xs: '0.76rem', sm: '0.8rem' },
                      lineHeight: 1.55,
                      mb: 1.2,
                    }}
                  >
                    {getLocalizedString(profile.title, lang)}
                  </Typography>
                  <Box
                    sx={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: 0.65,
                      px: 1.25,
                      py: 0.55,
                      borderRadius: '999px',
                      bgcolor: alpha('#0B5CAB', 0.1),
                      border: '1px solid rgba(11,92,171,0.18)',
                    }}
                  >
                    <LocationOnOutlinedIcon sx={{ fontSize: '0.9rem', color: 'primary.main' }} />
                    <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600 }}>
                      {getLocalizedString(profile.location, lang)}
                    </Typography>
                  </Box>
                </Box>

                {/* Stats grid */}
                <Grid container spacing={1.25} sx={{ mt: 0.5, width: '100%' }}>
                  {profile.stats.map((stat, index) => (
                    <Grid item xs={6} key={index}>
                      <Paper
                        elevation={0}
                        sx={{
                          minHeight: 94,
                          p: { xs: 1.5, sm: 1.75 },
                          textAlign: 'center',
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'center',
                          bgcolor: 'rgba(234,242,248,0.82)',
                          border: '1px solid rgba(15,37,55,0.1)',
                          borderRadius: '16px',
                          transition: 'all 0.25s ease',
                          '&:hover': {
                            bgcolor: alpha('#0B5CAB', 0.1),
                            borderColor: alpha('#0B5CAB', 0.24),
                            transform: 'translateY(-2px)',
                          },
                        }}
                      >
                        <Typography
                          variant="h5"
                          sx={{
                            fontWeight: 800,
                            fontSize: { xs: '1.4rem', md: '1.55rem' },
                            background: 'linear-gradient(90deg, #0B5CAB, #159DB3)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text',
                            lineHeight: 1.05,
                            mb: 0.5,
                          }}
                        >
                          {stat.value}
                        </Typography>
                        <Typography
                          variant="caption"
                          color="text.secondary"
                          sx={{ lineHeight: 1.25, fontSize: '0.7rem', fontWeight: 600 }}
                        >
                          {getLocalizedString(stat.label, lang)}
                        </Typography>
                      </Paper>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            </Paper>
          </AnimatedBox>

          {/* ── Right column: text + tech stack ── */}
          <Box sx={{ display: 'flex', alignItems: 'center', minWidth: 0 }}>
            <Box sx={{ width: '100%' }}>
              <AnimatedBox delay={0.2}>
              <Paper
                elevation={0}
                sx={{
                  p: { xs: 2.75, sm: 3.5, md: 4 },
                  mb: 3,
                  borderRadius: '22px',
                  bgcolor: 'rgba(248,251,254,0.78)',
                  border: '1px solid rgba(15,37,55,0.1)',
                  boxShadow: '0 14px 38px rgba(15,37,55,0.06)',
                }}
              >
                {getLocalizedStringArray(profile.about, lang).map((paragraph, i) => (
                  <Typography
                    key={i}
                    variant="body1"
                    sx={{
                      color: 'text.secondary',
                      maxWidth: '680px',
                      mb: 2,
                      '&:last-of-type': { mb: 0 },
                      lineHeight: 1.82,
                      fontSize: { xs: '0.98rem', md: '1.04rem' },
                    }}
                  >
                    {paragraph}
                  </Typography>
                ))}
              </Paper>
              </AnimatedBox>

              {/* Tech stack */}
              <AnimatedBox delay={0.3}>
              <Paper
                elevation={0}
                sx={{
                  p: { xs: 2.5, sm: 3, md: 3.25 },
                  borderRadius: '22px',
                  bgcolor: 'rgba(248,251,254,0.74)',
                  border: '1px solid rgba(11,92,171,0.16)',
                  boxShadow: '0 12px 34px rgba(15,37,55,0.055)',
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                  <CodeOutlinedIcon sx={{ color: 'primary.main', fontSize: '1.1rem' }} />
                  <Typography
                    variant="overline"
                    sx={{
                      color: 'primary.main',
                      fontFamily: '"Fira Code", monospace',
                      letterSpacing: '0.12em',
                    }}
                  >
                    {t('about.expertise')}
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {profile.techStack.map((tech, i) => (
                    <Chip
                      key={tech.name}
                      label={tech.name}
                      sx={{
                        maxWidth: '100%',
                        bgcolor: alpha(badgeColors[i % badgeColors.length], 0.08),
                        border: `1px solid ${alpha(badgeColors[i % badgeColors.length], 0.18)}`,
                        color: alpha(badgeColors[i % badgeColors.length], 0.95),
                        fontFamily: '"Fira Code", monospace',
                        fontSize: '0.74rem',
                        fontWeight: 600,
                        height: 32,
                        px: 0.75,
                        borderRadius: '999px',
                        transition: 'all 0.2s ease',
                        '& .MuiChip-label': {
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                        },
                        '&:hover': {
                          bgcolor: alpha(badgeColors[i % badgeColors.length], 0.14),
                          borderColor: alpha(badgeColors[i % badgeColors.length], 0.3),
                          transform: 'translateY(-2px)',
                          boxShadow: `0 6px 16px ${alpha(badgeColors[i % badgeColors.length], 0.1)}`,
                        },
                        cursor: 'default',
                      }}
                    />
                  ))}
                </Box>
              </Paper>
              </AnimatedBox>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
