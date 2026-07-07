import { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Chip,
  Container,
  IconButton,
  Tooltip,
  Typography,
  alpha,
} from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { profile } from '../../data/profile';

/* ── Gradient orb helper ─────────────────────────────────── */
function Orb({ sx }) {
  return (
    <Box
      aria-hidden="true"
      sx={{
        position: 'absolute',
        borderRadius: '50%',
        filter: 'blur(56px)',
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
  const typedRole = useTypewriter(profile.roles);

  const scrollToProjects = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <Box
      id="home"
      component="section"
      sx={{
        minHeight: { xs: '88vh', md: '84vh' },
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
        background: 'linear-gradient(180deg, #F6FAFD 0%, #EAF6FC 100%)',
        pt: { xs: 9, md: 8 },
        pb: { xs: 6, md: 7 },
      }}
    >
      {/* ── Background orbs ── */}
      <Orb
        sx={{
          width: { xs: 300, md: 520 },
          height: { xs: 300, md: 520 },
          background: 'radial-gradient(circle, rgba(26,140,216,0.18) 0%, transparent 70%)',
          top: '-80px',
          left: { xs: '-100px', md: '-150px' },
          animation: 'float1 22s ease-in-out infinite',
        }}
      />
      <Orb
        sx={{
          width: { xs: 260, md: 420 },
          height: { xs: 260, md: 420 },
          background: 'radial-gradient(circle, rgba(43,179,163,0.16) 0%, transparent 70%)',
          bottom: { xs: '-50px', md: '0px' },
          right: { xs: '-80px', md: '-100px' },
          animation: 'float2 18s ease-in-out infinite',
        }}
      />
      <Orb
        sx={{
          width: { xs: 180, md: 300 },
          height: { xs: 180, md: 300 },
          background: 'radial-gradient(circle, rgba(26,140,216,0.1) 0%, transparent 70%)',
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
            'radial-gradient(rgba(26,140,216,0.1) 1px, transparent 1px)',
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
                  <FiberManualRecordIcon
                    sx={{ fontSize: '10px !important', color: '#10B981 !important', animation: 'pulse-ring 2s infinite' }}
                  />
                }
                label={profile.availableLabel}
                size="small"
                sx={{
                  mb: 2,
                  bgcolor: alpha('#10B981', 0.12),
                  border: `1px solid ${alpha('#10B981', 0.35)}`,
                  color: '#10B981',
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
                Olá, eu sou
              </Box>
              <Box
                component="span"
                sx={{
                  background: 'linear-gradient(135deg, #1F2937 30%, #4B6680 100%)',
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
                  background: 'linear-gradient(90deg, #1A8CD8 0%, #2BB3A3 100%)',
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
                mb: 3.5,
                fontSize: { xs: '1rem', md: '1.1rem' },
                lineHeight: 1.75,
              }}
            >
              {profile.description}
            </Typography>
          </motion.div>

          {/* CTA Buttons */}
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
                variant="contained"
                color="primary"
                size="large"
                onClick={scrollToProjects}
              >
                Ver credenciais
              </Button>

              {profile.resume && (
                <Button
                  component="a"
                  href={profile.resume}
                  download
                  variant="outlined"
                  color="primary"
                  size="large"
                  startIcon={<FileDownloadOutlinedIcon />}
                >
                  Baixar currículo
                </Button>
              )}

              <Box sx={{ display: 'flex', gap: 1 }}>
                <Tooltip title="GitHub" arrow>
                  <IconButton
                    component="a"
                    href={profile.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub"
                    sx={{
                      border: '1px solid rgba(31,41,55,0.12)',
                      color: 'text.secondary',
                      '&:hover': {
                        borderColor: 'primary.main',
                        color: 'primary.main',
                        bgcolor: alpha('#1A8CD8', 0.08),
                      },
                    }}
                  >
                    <GitHubIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="LinkedIn" arrow>
                  <IconButton
                    component="a"
                    href={profile.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn"
                    sx={{
                      border: '1px solid rgba(31,41,55,0.12)',
                      color: 'text.secondary',
                      '&:hover': {
                        borderColor: 'secondary.main',
                        color: 'secondary.main',
                        bgcolor: alpha('#2BB3A3', 0.08),
                      },
                    }}
                  >
                    <LinkedInIcon />
                  </IconButton>
                </Tooltip>
              </Box>
            </Box>
          </motion.div>

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
                {'{'} location: "{profile.location}" {'}'}
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
          onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
        >
          <Typography variant="caption" sx={{ fontFamily: '"Fira Code", monospace', fontSize: '0.65rem', letterSpacing: '0.1em' }}>
            SCROLL
          </Typography>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
          >
            <KeyboardArrowDownIcon />
          </motion.div>
        </Box>
      </Container>
    </Box>
  );
}
