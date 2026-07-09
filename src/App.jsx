import { lazy, Suspense } from 'react';
import { ThemeProvider, CssBaseline, GlobalStyles, Box } from '@mui/material';
import theme from './theme/theme';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Hero from './components/sections/Hero';

const About = lazy(() => import('./components/sections/About'));
const Experience = lazy(() => import('./components/sections/Experience'));
const Projects = lazy(() => import('./components/sections/Projects'));
const Skills = lazy(() => import('./components/sections/Skills'));
const Contact = lazy(() => import('./components/sections/Contact'));

const globalStyles = `
  html {
    scroll-behavior: smooth;
    scroll-padding-top: 72px;
  }

  body {
    overflow-x: hidden;
  }

  :focus-visible {
    outline: 3px solid rgba(11, 92, 171, 0.3);
    outline-offset: 3px;
  }

  @keyframes float1 {
    0%, 100% { transform: translate(0, 0) scale(1); }
    33%       { transform: translate(35px, -55px) scale(1.06); }
    66%       { transform: translate(-25px, 20px) scale(0.94); }
  }
  @keyframes float2 {
    0%, 100% { transform: translate(0, 0) scale(1); }
    33%       { transform: translate(-45px, 35px) scale(0.94); }
    66%       { transform: translate(30px, -30px) scale(1.06); }
  }
  @keyframes float3 {
    0%, 100% { transform: translate(0, 0) scale(1); }
    50%       { transform: translate(20px, 40px) scale(1.08); }
  }
  @keyframes blink-cursor {
    0%, 100% { opacity: 1; }
    50%       { opacity: 0; }
  }
  @keyframes pulse-ring {
    0%   { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(11, 92, 171, 0.35); }
    70%  { transform: scale(1);    box-shadow: 0 0 0 10px rgba(11, 92, 171, 0); }
    100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(11, 92, 171, 0); }
  }

  @supports (overflow-x: clip) {
    body { overflow-x: clip; }
  }

  @media (prefers-reduced-motion: reduce) {
    html { scroll-behavior: auto; }
    *, *::before, *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
      scroll-behavior: auto !important;
    }
  }
`;

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <GlobalStyles styles={globalStyles} />
      <Box sx={{ overflowX: 'hidden', '@supports (overflow-x: clip)': { overflowX: 'clip' } }}>
        <Navbar />
        <main>
          <Hero />
          <Suspense fallback={null}>
            <About />
            <Experience />
            <Projects />
            <Skills />
            <Contact />
          </Suspense>
        </main>
        <Footer />
      </Box>
    </ThemeProvider>
  );
}
