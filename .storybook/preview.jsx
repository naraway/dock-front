import * as React from "react";
import {configure, isObservableArray} from 'mobx';
import {AppContext, dialogUtil} from "@nara-way/prologue";
import {AuthProvider, DockProvider} from "@nara-way/dock";
import {default as theme} from './config/theme';
import {default as DialogView} from './config/dialog';
import {devauth, devdock} from './config/dev';
import {ThemeProvider} from "@mui/material";

configure({
  //
  useProxies: 'ifavailable',
  isolateGlobalState: true,
  computedRequiresReaction: true,
  reactionRequiresObservable: true,
});

(() => {
  //
  const isArray = Array.isArray;
  Object.defineProperty(Array, 'isArray', {
    value: (target) => (isObservableArray(target) || isArray(target)),
  });
})();

export const parameters = {
  //
  actions: {argTypesRegex: '^on[A-Z].*'},
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

export const decorators = [
  Story => {
    //
    return (
      <div>
        <AppContext.Provider>
          <ThemeProvider theme={theme}>
            <dialogUtil.Viewer renderDialog={(params) => (<DialogView {...params} />)}/>
            <AuthProvider development devauth={{...devauth}}>
              <DockProvider development devdock={{...devdock}}>
                <Story/>
              </DockProvider>
            </AuthProvider>
          </ThemeProvider>
        </AppContext.Provider>
      </div>
    );
  },
];
