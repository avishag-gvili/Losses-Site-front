import { prefixer } from 'stylis';
import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import rtlPlugin from 'stylis-plugin-rtl';
import { Theme, createTheme } from '@mui/material';
export const theme = (outerTheme: Theme) =>
  createTheme({
    direction: 'rtl',
    palette: {
      mode: outerTheme.palette?.mode || 'light',
      primary: {
        main: '#1976d2',
      },
    },
  });
export const cacheRtl = createCache({
  key: 'muirtl',
  stylisPlugins: [prefixer, rtlPlugin],
});