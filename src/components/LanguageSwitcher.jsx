import { Button, ButtonGroup } from '@mui/material';
import { useTranslation } from 'react-i18next';

const LANGUAGES = [
  { code: 'pt', label: 'PT' },
  { code: 'en', label: 'EN' },
  { code: 'es', label: 'ES' },
];

export default function LanguageSwitcher({ sx }) {
  const { i18n, t } = useTranslation();
  const activeLanguage = (i18n.resolvedLanguage || i18n.language || 'pt').split('-')[0];

  return (
    <ButtonGroup size="small" aria-label={t('language.label')} sx={sx}>
      {LANGUAGES.map((language) => (
        <Button
          key={language.code}
          variant={activeLanguage === language.code ? 'contained' : 'outlined'}
          onClick={() => i18n.changeLanguage(language.code)}
          sx={{
            minWidth: 36,
            px: 1,
            fontFamily: '"Fira Code", monospace',
            fontSize: '0.72rem',
          }}
        >
          {language.label}
        </Button>
      ))}
    </ButtonGroup>
  );
}
