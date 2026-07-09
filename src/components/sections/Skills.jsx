import {
  Box,
  Card,
  CardContent,
  Chip,
  Container,
  Grid,
  Typography,
  alpha,
} from '@mui/material';
import WebIcon from '@mui/icons-material/Web';
import StorageIcon from '@mui/icons-material/Storage';
import TableChartIcon from '@mui/icons-material/TableChart';
import CloudIcon from '@mui/icons-material/Cloud';
import BugReportIcon from '@mui/icons-material/BugReport';
import BuildIcon from '@mui/icons-material/Build';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import SectionTitle from '../ui/SectionTitle';
import { skillCategories } from '../../data/skills';
import { getLocalizedString, getLocalizedStringArray } from '../../utils/i18nHelper';

const ICON_MAP = {
  Web: WebIcon,
  Storage: StorageIcon,
  TableChart: TableChartIcon,
  Cloud: CloudIcon,
  BugReport: BugReportIcon,
  Build: BuildIcon,
};

function SkillCard({ category, cardIndex, lang }) {
  const IconComponent = ICON_MAP[category.icon] || BuildIcon;
  const skills = getLocalizedStringArray(category.skills, lang);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.55, delay: cardIndex * 0.08, ease: [0.22, 1, 0.36, 1] }}
      style={{ height: '100%' }}
    >
      <Card
        sx={{
          height: '100%',
          background: category.gradient,
          borderTop: `2px solid ${alpha(category.color, 0.6)}`,
          '&:hover': {
            borderTop: `2px solid ${category.color}`,
            boxShadow: `0 12px 32px ${alpha(category.color, 0.16)}`,
          },
        }}
      >
        <CardContent sx={{ p: { xs: 2.5, md: 3 } }}>
          {/* Header */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2.5 }}>
            <Box
              sx={{
                width: 40,
                height: 40,
                borderRadius: '10px',
                bgcolor: alpha(category.color, 0.15),
                border: `1px solid ${alpha(category.color, 0.3)}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <IconComponent sx={{ color: category.color, fontSize: '1.2rem' }} />
            </Box>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                fontSize: '1rem',
                color: 'text.primary',
              }}
            >
              {getLocalizedString(category.title, lang)}
            </Typography>
          </Box>

          {/* Skills */}
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.9 }}>
            {skills.map((skill) => (
              <Chip
                key={skill}
                label={skill}
                size="small"
                sx={{
                  maxWidth: '100%',
                  bgcolor: alpha(category.color, 0.1),
                  border: `1px solid ${alpha(category.color, 0.22)}`,
                  color: alpha(category.color, 0.9),
                  fontFamily: '"Fira Code", monospace',
                  fontSize: '0.73rem',
                  height: 28,
                  transition: 'all 0.2s ease',
                  cursor: 'default',
                  '& .MuiChip-label': {
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  },
                  '&:hover': {
                    bgcolor: alpha(category.color, 0.2),
                    borderColor: category.color,
                    color: '#F8FBFE',
                    transform: 'translateY(-2px)',
                  },
                }}
              />
            ))}
          </Box>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export default function Skills() {
  const { i18n, t } = useTranslation();
  const lang = i18n.resolvedLanguage || 'pt';

  return (
    <Box
      id="skills"
      component="section"
      sx={{
        py: { xs: 8, md: 10 },
        background: 'linear-gradient(180deg, #F3F8FC 0%, #EAF2F8 100%)',
      }}
    >
      <Container maxWidth="lg">
        <SectionTitle
          overline={t('skills.overline')}
          title={t('skills.title')}
          subtitle={t('skills.subtitle')}
        />

        <Grid container spacing={3}>
          {skillCategories.map((category, index) => (
            <Grid item xs={12} sm={6} lg={4} key={category.id}>
              <SkillCard category={category} cardIndex={index} lang={lang} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
