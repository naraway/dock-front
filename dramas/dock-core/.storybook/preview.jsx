import React from 'react';
import { useMemo } from 'react';
import { darkTheme, lightTheme } from './theme';
import { ThemeProvider } from '@mui/material';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { DialogProvider } from 'muibox';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

export const decorators = [
  (Story, context) => {
    const queryClient = useMemo(() => new QueryClient(), []);

    const theme = context.globals.backgrounds?.value < '#666666' ? darkTheme : lightTheme;
    window.document.body.style.backgroundColor = theme.palette.background.default;

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
