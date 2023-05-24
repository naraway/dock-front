import React, { useEffect, useMemo } from 'react';
import { ThemeProvider } from '@mui/material';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { DialogProvider } from 'muibox';
import { useTranslation } from 'react-i18next';
import '../src/locales/i18n';
import { darkTheme, lightTheme } from './theme';
import { initInterceptors } from '../src';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

export const globalTypes = {
  locale: {
    name: 'Locale',
    description: 'Internationalization locale',
    defaultValue: 'en',
    toolbar: {
      icon: 'globe',
      items: [
        { value: 'en', right: '🇺🇸', title: 'English' },
        { value: 'ko', right: '🇰🇷', title: '한국어' },
      ],
    },
  },
};

export const decorators = [
  (Story, context) => {
    const queryClient = useMemo(() => new QueryClient(), []);

    const development = process.env.NODE_ENV !== 'production';

    const { i18n } = useTranslation();
    if (context.globals.locale !== i18n.language) {
      i18n.changeLanguage(context.globals.locale);
    }

    const theme = context.globals.backgrounds?.value < '#666666' ? darkTheme : lightTheme;
    window.document.body.style.backgroundColor = theme.palette.background.default;

    useEffect(() => {
      initInterceptors();
    }, []);

    return (
      <React.StrictMode>
        <QueryClientProvider client={queryClient}>
          <ReactQueryDevtools initialIsOpen={false} />
          <div style={{ color: theme.palette.text.primary }}>
            <ThemeProvider theme={theme}>
              <DialogProvider>
                <Story />
              </DialogProvider>
            </ThemeProvider>
          </div>
        </QueryClientProvider>
      </React.StrictMode>
    );
  },
];
