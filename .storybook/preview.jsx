import * as React from "react";
import {configure, isObservableArray} from 'mobx';
import {AppContext, dialogUtil} from "@nara-way/prologue";
import {AuthProvider, DockProvider} from "@nara-way/dock";
import {darkTheme, lightTheme} from './config/theme';
import {default as DialogView} from './config/dialog';
import {devauth, devdock, devinterceptors} from './config/dev';
import {ThemeProvider} from "@mui/material";

configure({
  useProxies: 'ifavailable',
  isolateGlobalState: true,
  computedRequiresReaction: true,
  reactionRequiresObservable: true,
});

(() => {
  const isArray = Array.isArray;
  Object.defineProperty(Array, 'isArray', {
    value: (target) => (isObservableArray(target) || isArray(target)),
  });
})();

export const parameters = {
  actions: {argTypesRegex: '^on[A-Z].*'},
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

const development = process.env.NODE_ENV !== 'production';
const darkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
const theme = darkMode ? darkTheme : lightTheme;

export const decorators = [
  Story => {
    window.document.body.style.backgroundColor = theme.palette.background.default;
    return (
      <div style={{ color: theme.palette.text.primary }}>
        <AppContext.Provider>
          <ThemeProvider theme={theme}>
            <dialogUtil.Viewer renderDialog={(params) => (<DialogView {...params} />)}/>
            <AuthProvider development={development} devauth={{...devauth}} interceptors={devinterceptors}>
              <DockProvider development={development} devdock={{...devdock}}>
                <Story/>
              </DockProvider>
            </AuthProvider>
          </ThemeProvider>
        </AppContext.Provider>
      </div>
    );
  },
];
