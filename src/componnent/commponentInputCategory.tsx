import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { styled, lighten, darken } from '@mui/system';
import { Theme, createTheme } from '@mui/material';
import { theme, cacheRtl } from '../style/style'
import { CacheProvider, ThemeProvider } from '@emotion/react';

interface RenderGroupProps {
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

// const theme = (outerTheme: Theme) =>
//   createTheme({
//     direction: 'rtl',
//     palette: {
//       mode: outerTheme.palette.mode,
//     },
//   });

// const cacheRtl = createCache({
//   key: 'muirtl',
//   stylisPlugins: [prefixer, rtlPlugin],
// });

const GroupHeader = styled('div')(({ theme }) => ({
  position: 'sticky',
  top: '-8px',
  padding: '4px 10px',
  color: theme.palette.primary.main,
  backgroundColor:
    theme.palette.mode === 'light'
      ? lighten(theme.palette.primary.light, 0.85)
      : darken(theme.palette.primary.main, 0.8),
}));

const GroupItems = styled('ul')({
  padding: 0,
});

export default function RenderGroup({ handleChange }: RenderGroupProps) {
  
  const options = top100Films.map((option) => {
    const firstLetter = option.title[0].toUpperCase();
    return {
      firstLetter: /[0-9]/.test(firstLetter) ? '0-9' : firstLetter,
      ...option,
    };
  });

  const handleInputChange = (
    event: React.SyntheticEvent<Element, Event>,
    value: string
  ) => {
    handleChange({
      target: {
        name: 'category',
        value: value,
      },
    } as React.ChangeEvent<HTMLInputElement>);
  };

  return (
    <CacheProvider value={cacheRtl}>
      <ThemeProvider theme={theme}>
        <div dir="rtl">
          <Autocomplete
            options={options.sort((a, b) => -b.firstLetter.localeCompare(a.firstLetter))}
            groupBy={(option) => option.firstLetter}
            getOptionLabel={(option) => option.title}
            sx={{ width: 300 }}
            onInputChange={handleInputChange}
            renderInput={(params) =>
              <TextField
                {...params}
                id="category"
                label="קטגוריות"
                name="category"
                fullWidth
              />
            }
            renderGroup={(params) => (
              <li key={params.key}>
                <GroupHeader>{params.group}</GroupHeader>
                <GroupItems>{params.children}</GroupItems>
              </li>
            )}
          />
        </div>
      </ThemeProvider>
    </CacheProvider>
  );
}

const top100Films = [
  { title: 'אביזרים לבית' },
  { title: 'אופניים ואביזרים' },
  { title: 'גינון' },
  { title: 'דיברי דואר' },
  { title: 'בגדים' },
  { title: 'הנעלה' },
  { title: 'כרטיסים שוברים וזיכויים' },
  { title: 'מוצרי תינוקות וילדים' },
  { title: "מפתחות" },
  { title: 'מצלמות' },
  { title: 'משחקים', },
  { title: 'משקפים' },
  { title: 'ספרים' },
  { title: 'עגלות', },
  { title: 'פלאפונים ואוזניות', },
  { title: 'שקית קניות ' },
  { title: 'תיקים וארנקים' },
  { title: 'תכשיטים', },
  { title: "תשמישי קדושה" },
  { title: 'כלי עבודה' },
  { title: 'כלי נגינה' },
  { title: 'מוצרי חשמל' },
  { title: 'חיות מחמד' },
  { title: 'מיזוודות' },
  { title: 'מחשבים וציוד מיחשוב' },
  { title: 'ריהוט' },
  { title: "תרופות וציוד רפואי" }
];
