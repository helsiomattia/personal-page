import { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Chip,
  Container,
  Typography,
  alpha,
} from '@mui/material';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { profile } from '../../data/profile';
import { getLocalizedString, getLocalizedStringArray } from '../../utils/i18nHelper';
import { scrollToSection } from '../../utils/scrollToSection';

/* ── Gradient orb helper ─────────────────────────────────── */
function Orb({ sx }) {
  return (
    <Box
      aria-hidden="true"
      sx={{
        position: 'absolute',
        borderRadius: '50%',
        filter: { xs: 'blur(32px)', md: 'blur(40px)' },
        pointerEvents: 'none',
        ...sx,
      }}
    />
  );
}

/* ── Typewriter hook ─────────────────────────────────────── */
function useTypewriter(words, typingSpeed = 90, deletingSpeed = 50, pauseDuration = 2200) {
  const [roleIndex, setRoleIndex] = useState(0);
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (!words.length) return undefined;

    const fullText = words[roleIndex];
    let delay;

    if (!isDeleting && text === fullText) {
      delay = pauseDuration;
      const t = setTimeout(() => setIsDeleting(true), delay);
      return () => clearTimeout(t);
    }

    if (isDeleting && text === '') {
      setIsDeleting(false);
      setRoleIndex((i) => (i + 1) % words.length);
      return;
    }

    delay = isDeleting ? deletingSpeed : typingSpeed;
    const t = setTimeout(() => {
      setText(isDeleting ? fullText.slice(0, text.length - 1) : fullText.slice(0, text.length + 1));
    }, delay);
    return () => clearTimeout(t);
  }, [text, isDeleting, roleIndex, words, typingSpeed, deletingSpeed, pauseDuration]);

  return text;
}

/* ── Framer variants ─────────────────────────────────────── */
const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

/* ── Hero component ──────────────────────────────────────── */
export default function Hero() {
  const { i18n, t } = useTranslation();
  const lang = i18n.resolvedLanguage || 'pt';
  const roles = getLocalizedStringArray(profile.roles, lang);
  const valuePillars = getLocalizedStringArray(profile.valuePillars, lang);
  const typedRole = useTypewriter(roles);

  return (
    <Box
      id="home"
      component="section"
      sx={{
        minHeight: '100vh',
        '@supports (height: 100svh)': {
          minHeight: '100svh',
        },
        '@supports (height: 100dvh)': {
          minHeight: '100dvh',
        },
        boxSizing: 'border-box',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
        background: 'linear-gradient(180deg, #EAF2F8 0%, #DCEAF4 100%)',
        pt: { xs: 9, md: 8 },
        pb: { xs: 6, md: 7 },
      }}
    >
      {/* ── Background orbs ── */}
      <Orb
        sx={{
          width: { xs: 300, md: 520 },
          height: { xs: 300, md: 520 },
          background: 'radial-gradient(circle, rgba(11,92,171,0.24) 0%, transparent 70%)',
          top: '-80px',
          left: { xs: '-100px', md: '-150px' },
          animation: 'float1 22s ease-in-out infinite',
        }}
      />
      <Orb
        sx={{
          width: { xs: 260, md: 420 },
          height: { xs: 260, md: 420 },
          background: 'radial-gradient(circle, rgba(21,157,179,0.18) 0%, transparent 70%)',
          bottom: { xs: '-50px', md: '0px' },
          right: { xs: '-80px', md: '-100px' },
          animation: 'float2 18s ease-in-out infinite',
        }}
      />
      <Orb
        sx={{
          width: { xs: 180, md: 300 },
          height: { xs: 180, md: 300 },
          background: 'radial-gradient(circle, rgba(11,92,171,0.13) 0%, transparent 70%)',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          animation: 'float3 25s ease-in-out infinite',
        }}
      />

      {/* ── Dot grid overlay ── */}
      <Box
        aria-hidden="true"
        sx={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'radial-gradient(rgba(11,92,171,0.14) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
          pointerEvents: 'none',
        }}
      />

      {/* ── Main content ── */}
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <motion.div variants={containerVariants} initial="hidden" animate="visible">
          {/* Available badge */}
          {profile.available && (
            <motion.div variants={itemVariants}>
              <Chip
                icon={
                  <Box
                    component="span"
                    sx={{
                      width: 8,
                      height: 8,
                      borderRadius: '50%',
                      bgcolor: '#0B8F61',
                      animation: 'pulse-ring 2s infinite',
                    }}
                  />
                }
                label={getLocalizedString(profile.availableLabel, lang)}
                size="small"
                sx={{
                  mb: 2,
                  bgcolor: alpha('#0B8F61', 0.13),
                  border: `1px solid ${alpha('#0B8F61', 0.36)}`,
                  color: '#0B8F61',
                  fontFamily: '"Fira Code", monospace',
                  fontSize: '0.75rem',
                  letterSpacing: '0.03em',
                  cursor: 'default',
                }}
              />
            </motion.div>
          )}

          {/* Name */}
          <motion.div variants={itemVariants}>
            <Typography
              variant="h1"
              sx={{
                fontSize: { xs: '2.5rem', sm: '3.5rem', md: '5rem', lg: '6rem' },
                mb: 1,
                lineHeight: 1.05,
              }}
            >
              <Box
                component="span"
                sx={{
                  display: 'block',
                  color: 'text.secondary',
                  fontSize: { xs: '1rem', md: '1.15rem' },
                  fontWeight: 400,
                  fontFamily: '"Fira Code", monospace',
                  mb: 1,
                  letterSpacing: '0.05em',
                }}
              >
                {t('hero.greeting')}
              </Box>
              <Box
                component="span"
                sx={{
                  background: 'linear-gradient(135deg, #0F2537 30%, #284B68 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                {profile.name}
              </Box>
            </Typography>
          </motion.div>

          {/* Typed role */}
          <motion.div variants={itemVariants}>
            <Typography
              variant="h2"
              sx={{
                fontSize: { xs: '1.4rem', sm: '1.8rem', md: '2.5rem' },
                mb: 2,
                fontWeight: 600,
                minHeight: { xs: '2.2rem', md: '3rem' },
                display: 'flex',
                alignItems: 'center',
                gap: 1,
              }}
            >
              <Box
                component="span"
                sx={{
                  background: 'linear-gradient(90deg, #0B5CAB 0%, #159DB3 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                {typedRole}
              </Box>
              <Box
                component="span"
                sx={{
                  display: 'inline-block',
                  width: '3px',
                  height: { xs: '1.4rem', md: '2rem' },
                  bgcolor: 'primary.main',
                  borderRadius: '2px',
                  animation: 'blink-cursor 1s ease-in-out infinite',
                  verticalAlign: 'middle',
                  ml: 0.5,
                }}
              />
            </Typography>
          </motion.div>

          {/* Description */}
          <motion.div variants={itemVariants}>
            <Typography
              variant="body1"
              sx={{
                maxWidth: { xs: '100%', md: '580px' },
                color: 'text.secondary',
                mb: 2.25,
                fontSize: { xs: '1rem', md: '1.1rem' },
                lineHeight: 1.75,
              }}
            >
              {getLocalizedString(profile.description, lang)}
            </Typography>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Box
              sx={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: 1,
                maxWidth: { xs: '100%', md: 680 },
                mb: 3,
              }}
            >
              {valuePillars.map((pillar) => (
                <Box
                  key={pillar}
                  component="span"
                  sx={{
                    px: { xs: 1.15, sm: 1.4 },
                    py: 0.75,
                    maxWidth: '100%',
                    borderRadius: '999px',
                    border: '1px solid rgba(11,92,171,0.24)',
                    bgcolor: 'rgba(248,251,254,0.72)',
                    color: 'text.secondary',
                    fontFamily: '"Fira Code", monospace',
                    fontSize: { xs: '0.68rem', sm: '0.72rem' },
                    fontWeight: 600,
                    lineHeight: 1.4,
                    boxShadow: '0 8px 24px rgba(15,37,55,0.06)',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: { xs: 'normal', sm: 'nowrap' },
                  }}
                >
                  {pillar}
                </Box>
              ))}
            </Box>
          </motion.div>

          {profile.resume && (
            <motion.div variants={itemVariants}>
              <Box
                sx={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: 2,
                  alignItems: 'center',
                  mb: 3.5,
                }}
              >
                <Button
                  component="a"
                  href={profile.resume}
                  download
                  variant="outlined"
                  color="primary"
                  size="large"
                >
                  {t('hero.downloadResume')}
                </Button>
              </Box>
            </motion.div>
          )}

          {/* Location & code flavor */}
          <motion.div variants={itemVariants}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1.5,
                flexWrap: 'wrap',
              }}
            >
              <Typography
                variant="caption"
                sx={{ color: 'text.secondary', fontFamily: '"Fira Code", monospace' }}
              >
                {'{'} {t('hero.locationKey')}: "{getLocalizedString(profile.location, lang)}" {'}'}
              </Typography>
            </Box>
          </motion.div>
        </motion.div>

        {/* Scroll down indicator */}
        <Box
          sx={{
            position: 'absolute',
            bottom: { xs: 16, md: 24 },
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 0.5,
            opacity: 0.5,
            cursor: 'pointer',
            '&:hover': { opacity: 1 },
            transition: 'opacity 0.3s',
          }}
          onClick={() => scrollToSection('about')}
        >
          <Typography variant="caption" sx={{ fontFamily: '"Fira Code", monospace', fontSize: '0.65rem', letterSpacing: '0.1em' }}>
            {t('hero.scroll')}
          </Typography>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
          >
            <Box
              aria-hidden="true"
              sx={{
                width: 12,
                height: 12,
                borderRight: '2px solid currentColor',
                borderBottom: '2px solid currentColor',
                transform: 'rotate(45deg)',
              }}
            />
          </motion.div>
        </Box>
      </Container>
    </Box>
  );
}
